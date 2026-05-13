"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RefreshCw, Home, Mail, Code, ExternalLink } from "lucide-react";

export default function CustomContextMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      const menuWidth = 220;
      const menuHeight = 280;

      let x = e.clientX;
      let y = e.clientY;

      if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
      if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;

      setPosition({ x, y });
      setIsVisible(true);
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    const handleScroll = () => {
      if (isVisible) setIsVisible(false);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  if (typeof window === "undefined") return null;

  const actions = [
    { label: "Back", icon: <ArrowLeft className="w-[14px] h-[14px]" />, onClick: () => window.history.back() },
    { label: "Forward", icon: <ArrowRight className="w-[14px] h-[14px]" />, onClick: () => window.history.forward() },
    { label: "Reload", icon: <RefreshCw className="w-[14px] h-[14px]" />, onClick: () => window.location.reload() },
    { divider: true },
    { label: "Home", icon: <Home className="w-[14px] h-[14px]" />, onClick: () => router.push("/") },
    { label: "Projects", icon: <Code className="w-[14px] h-[14px]" />, onClick: () => router.push("/projects") },
    { label: "Contact", icon: <Mail className="w-[14px] h-[14px]" />, onClick: () => router.push("/contact") },
    { divider: true },
    { label: "View Source", icon: <ExternalLink className="w-[14px] h-[14px]" />, onClick: () => window.open("https://github.com/sid20007/sid20007.github.io", "_blank") }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          transition={{ duration: 0.15 }}
          className="fixed z-[10001] w-52 p-1.5 rounded-xl border border-white/[0.08] bg-[#111113]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col gap-0.5"
          style={{ top: position.y, left: position.x }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {actions.map((action, index) => {
            if (action.divider) {
              return <div key={index} className="h-px w-full bg-white/[0.06] my-1" />;
            }
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[13px] font-medium tracking-wide text-white/70 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors text-left"
              >
                {action.icon}
                {action.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}