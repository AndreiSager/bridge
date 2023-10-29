"use client";

import Link from "next/link";

import clsx from "clsx";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

export default function DesktopItem({
  label,
  href,
  icon: Icon,
  onClick,
  active,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-[10px] text-sm leading-6 font-semibold text-unselected-gray hover:text-blue-1 hover:bg-gray-100",
          active && "bg-gray-100 !text-blue-1"
        )}
      >
        <Icon className="h-[25px] w-[25px] shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
