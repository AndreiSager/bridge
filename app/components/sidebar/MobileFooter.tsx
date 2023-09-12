"use client";

import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "./MobileItem";

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map(({ label, href, icon, active, onClick }) => (
        <MobileItem
          key={label}
          href={href}
          label={label}
          icon={icon}
          active={active}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
