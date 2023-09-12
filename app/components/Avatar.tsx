"use client";

import Image from "next/image";

import { User } from "@prisma/client";

interface AvatarProps {
  user?: User;
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 md:h-11 aspect-square">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          fill
          alt="Avatar"
        />
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 md:h-3 aspect-square" />
    </div>
  );
}
