"use client";

import Link from "next/link";
import { navLinks } from "@/data/site";
import NavHeader from "@/components/ui/nav-header";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isFullName, setIsFullName] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFullName((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-4">
        <Link
          href="/"
          className="relative text-sm font-medium tracking-tight text-[#e4e4e7] transition-colors duration-300 hover:text-white flex items-center min-w-[80px]"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isFullName ? "full" : "short"}
              initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-block"
            >
              {isFullName ? "Siddharth" : "Sid"}
            </motion.span>
          </AnimatePresence>
        </Link>

        {/* Sliding cursor nav — desktop & mobile */}
        <NavHeader links={navLinks} />
      </nav>
    </header>
  );
}