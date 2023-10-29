"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { FaMessage, FaPeopleGroup } from "react-icons/fa6";
import { BiSolidMessage } from "react-icons/bi";
import { IoPeople } from "react-icons/io5";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

export default function useRoutes() {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: BiSolidMessage,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: IoPeople,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
}
