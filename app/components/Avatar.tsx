"use client";

import Image from "next/image";

import { User } from "@prisma/client";

import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

export default function Avatar({ user }: AvatarProps) {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="flex justify-center items-center relative inline-block rounded-full overflow-hidden h-9 md:h-11 aspect-square">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          fill
          alt="Avatar"
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-online-green ring-2 ring-white top-0 right-0 h-2 md:h-3 aspect-square" />
      )}
    </div>
  );
}
