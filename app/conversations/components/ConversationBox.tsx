"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image ";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex items-center space-x-3 hover:bg-blue-2 rouded-lg transition cursor-pointer p-3 rounded-xl group",
        selected ? "bg-blue-2" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1 ">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center">
            <p
              className={clsx(
                "text-sm !font-bold group-hover:text-white",
                selected ? "text-white" : "text-gray-900"
              )}
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className={clsx(
                  "text-xs font-light group-hover:text-white",
                  selected ? "text-white" : "text-gray-400"
                )}
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={
              (clsx("text-sm truncate"),
              selected
                ? "text-white"
                : "text-white" && hasSeen
                ? "text-gray-500 group-hover:text-white"
                : "text-black")
            }
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
