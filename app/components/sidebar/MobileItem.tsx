"use client";

import Link from "next/link";

import clsx from "clsx";

interface MobileItemProps {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

export default function MobileItem({
  label,
  href,
  icon: Icon,
  onClick,
  active,
}: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon classname="h-6 aspect-square" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
