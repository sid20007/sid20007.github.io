"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavHeaderProps {
  links: { href: string; label: string }[];
}

function NavHeader({ links }: NavHeaderProps) {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {links.map((link) => (
        <Tab key={link.href} setPosition={setPosition} href={link.href} isActive={
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
        }>
          {link.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: (pos: { left: number; width: number; opacity: number }) => void;
  href: string;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer"
    >
      <Link
        href={href}
        className={`block px-3 py-1.5 text-xs uppercase tracking-wide sm:px-4 sm:py-2 sm:text-sm transition-colors ${
          isActive ? "text-white" : "text-[#a1a1aa]"
        } hover:text-white`}
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 h-7 sm:h-9 rounded-full bg-white/[0.08]"
    />
  );
};

export default NavHeader;
