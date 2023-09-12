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
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon classname="h-6 aspect-square shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
