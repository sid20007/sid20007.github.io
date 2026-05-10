"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl font-semibold tracking-tight text-[#e4e4e7]"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-3 max-w-lg text-base text-[#a1a1aa] leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
}