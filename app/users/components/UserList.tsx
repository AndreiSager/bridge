"use client";

import { User } from "@prisma/client";

import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

export default function UserList({ items }: UserListProps) {
  return (
    <aside className="flex flex-col overflow-hidden fixed inset-y-0 pb-0 lg:pb-0 lg:left-[60px] w-full lg:w-[300px] lg:block border-r-[1px] border-gray-200 gap-[10px] h-full border-b-1 border-b-slate-200 px-[10px]">
      <div className="flex justify-between items-center mb-2 pt-[23px]">
        <div className="text-2xl font-bold text-neutral-800 ">Bridge</div>
      </div>
      {items.map((item) => (
        <UserBox key={item.id} data={item} />
      ))}
    </aside>
  );
}
