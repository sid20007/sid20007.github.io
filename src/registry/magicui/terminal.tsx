"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
}

export function Terminal({ children, className, title = "bash", ...props }: TerminalProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-white/[0.06] bg-[#0c0c0e] font-mono text-sm text-neutral-300 shadow-2xl overflow-hidden w-full",
        className
      )}
      {...props}
    >
      {}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#131316] border-b border-white/[0.06] select-none">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-xs text-neutral-500 font-medium">{title}</div>
        <div className="w-12" /> {}
      </div>

      {}
      <div className="p-4 flex flex-col gap-1.5 min-h-[160px] bg-[#09090b] overflow-y-auto leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface AnimatedSpanProps extends React.ComponentPropsWithoutRef<typeof motion.span> {
  delay?: number;
}

export function AnimatedSpan({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.span
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("block", className)}
      {...props}
    >
      {children}
    </motion.span>
  );
}

interface TypingAnimationProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  delay?: number;
  duration?: number;
}

export function TypingAnimation({
  children,
  delay = 0,
  duration = 30,
  className,
  ...props
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < children.length) {
        setDisplayedText((prev) => prev + children.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [started, children, duration]);

  if (!started) return null;

  const isCompleted = displayedText.length === children.length;

  return (
    <span className={cn("block font-mono", className)} {...props}>
      {displayedText}
      {!isCompleted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-4 bg-neutral-400 ml-0.5 align-middle"
        />
      )}
    </span>
  );
}