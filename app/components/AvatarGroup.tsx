"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users: User[];
}

export default function AvatarGroup({ users }: AvatarGroupProps) {
  const slicedUsers = users?.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 aspect-square">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] aspect-square ${
            positionMap[index as keyof typeof positionMap]
          }`}
        >
          <Image
            src={user?.image || "/images/placeholder.jpg"}
            alt="Avatar Group"
            fill
          />
        </div>
      ))}
    </div>
  );
}
