"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 0.1, 0.16, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: sectionVariants.hidden,
        visible: delay
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.33, 0.1, 0.16, 1],
                delay,
              },
            }
          : sectionVariants.visible,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}