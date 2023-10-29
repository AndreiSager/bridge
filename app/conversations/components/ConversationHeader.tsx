"use client";

import { useEffect, useMemo, useState } from "react";

import clsx from "clsx";
import { BiFilter, BiSearchAlt, BiSolidMessageAdd } from "react-icons/bi";
import { User } from "@prisma/client";

import { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import GroupChatModal from "./GroupChatModal";

interface ConversationsListProps {
  initialItems: FullConversationType[];
  users: User[];
}

export default function ConversationHeader({
  initialItems,
  users,
}: ConversationsListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "lg:block h-[120px] border-b-1 border-b-slate-200 px-[10px]",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="flex justify-between items-center mb-2 pt-4">
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

        <div className="flex flex-row justify-between items-center  w-full h-[40px] bg-slate-100 rounded-xl p-3">
          <div className="flex flex-row">
            <div className="flex justify-center items-center">
              <BiSearchAlt size={25} />
            </div>
            <div className="flex items-center text-sm font-bold text-neutral-800">
              Search Bridge
            </div>
          </div>
          <div>
            <BiFilter size={25} />
          </div>
        </div>
      </aside>
    </>
  );
}
