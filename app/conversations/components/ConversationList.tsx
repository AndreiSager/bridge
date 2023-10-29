"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import { BiSolidMessageAdd } from "react-icons/bi";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { find } from "lodash";

import { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { pusherClient } from "@/app/libs/pusher";

interface ConversationsListProps {
  initialItems: FullConversationType[];
  users: User[];
}

export default function ConversationList({
  initialItems,
  users,
}: ConversationsListProps) {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return { ...currentConversation, messages: conversation.messages };
          }

          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return { ...current.filter((convo) => convo.id !== conversation.id) };
      });

      if (conversationId === conversation.id) {
        router.push("/conversation");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-0 lg:pb-0 lg:left-[60px] lg:w-[300px] lg:block border-r-[1px] border-gray-200",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="sticky flex flex-col gap-[10px]">
            <div className="flex justify-between items-center mb-2 pt-4 border-b-slate-200 sticky top-0">
              <div className="text-2xl font-bold text-neutral-800">
                Conversations
              </div>
              <div
                onClick={() => setIsModalOpen(true)}
                className="rounded-full p-[10px] hover:bg-gray-100 text-unselected-gray cursor-pointer transition flex justify-center items-center hover:text-blue-2"
              >
                <BiSolidMessageAdd size={25} />
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-800 w-full h-[20px]">
              Search
            </div>
          </div>
          <div className="w-full h-[1px] bg-slate-200 rounded-full" />
          <div className=" flex flex-col gap-[20px] overflow-y-auto">
            <div className="flex flex-col gap-[10px]">
              <div className="text-lg font-bold text-neutral-800">
                Pinned Conversations
              </div>
              {items.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))}
            </div>
            <div className="w-full h-[1px] bg-slate-200 rounded-full" />
            <div className="flex flex-col gap-[10px]">
              <div className="text-lg font-bold text-neutral-800">
                All Conversations
              </div>
              {items.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))}
            </div>
            <div className="w-full h-[1px] bg-slate-200 rounded-full" />
            <div className="flex flex-col gap-[10px]">
              <div className="text-lg font-bold text-neutral-800">
                All Conversations
              </div>
              {items.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
