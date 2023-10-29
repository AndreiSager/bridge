"use client";

import { useCallback, useMemo } from "react";

import { useSession } from "next-auth/react";
import { Conversation, Message, User } from "@prisma/client";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import { BsThreeDots } from "react-icons/bs";

interface MemberboxProps {
  member: User;
}

export default function MemberBox({ member }: MemberboxProps) {
  const session = useSession();

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  return (
    <div className=" flex flex-row justify-between items-center">
      <div className="min-w-0 flex-1 flex flex-row items-center gap-2">
        <Avatar user={member} />
        <div className="focus:outline-none flex flex-col">
          <div className="mb-1">
            <p className="text-md font-medium text-gray-900">{member.name}</p>
            <p>Subtitle</p>
          </div>
        </div>
      </div>
      <div className="hover:bg-gray-200 h-[50px] aspect-square rounded-full flex justify-center items-center">
        <BsThreeDots size={25} />
      </div>
    </div>
  );
}
