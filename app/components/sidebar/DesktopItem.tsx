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
  icon,
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
      <Link href={href}>
        <span>{label}</span>
      </Link>
    </li>
  );
}
