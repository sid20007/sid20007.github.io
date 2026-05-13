"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, ReactNode, useEffect } from "react";

interface GridWipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function GridWipeModal({ isOpen, onClose, children, title = "Preview" }: GridWipeModalProps) {
  const cols = 16;
  const rows = 12;

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const cells = useMemo(() => {
    const arr = [];
    const max = Math.hypot((cols - 1) / 2, (rows - 1) / 2);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {

        const raw = Math.hypot(x - (cols - 1) / 2, y - (rows - 1) / 2);
        const normalized = (raw / max);
        arr.push({ x, y, delay: normalized * 0.4, reverseDelay: (1 - normalized) * 0.3 });
      }
    }
    return arr;
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          {}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.3 } }}
            onClick={onClose}
          />

          {}
          <motion.div
            className="relative w-full max-w-4xl h-[85vh] max-h-[800px] bg-[#0a0a0b] rounded-2xl border border-white/[0.08] shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, delay: 0.4 } }}
          >
            {}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.04] bg-[#111113] z-20">
              <span className="text-sm font-medium text-white/80">{title}</span>
              <button
                onClick={onClose}
                className="p-1.5 text-white/50 hover:text-white bg-white/5 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {}
            <div className="flex-1 relative bg-[#0a0a0b] overflow-hidden">
              <div className="absolute inset-0 overflow-y-auto p-4 sm:p-6 rounded-b-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 z-0">
                {children}
              </div>

              {}
              <div
                className="pointer-events-none absolute inset-0 z-10 grid"
                style={{
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`
                }}
              >
                {cells.map((cell, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111113]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, transition: { duration: 0.3, delay: cell.delay, ease: "easeOut" } }}
                    exit={{ opacity: 1, transition: { duration: 0.2, delay: cell.reverseDelay, ease: "easeIn" } }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}