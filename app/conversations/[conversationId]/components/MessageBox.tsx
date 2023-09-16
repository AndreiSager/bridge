"use client";

import { useSession } from "next-auth/react";

import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

export default function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenLIst = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
        </div>
      </div>
    </div>
  );
}
