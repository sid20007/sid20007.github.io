"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 origin-left bg-white/20 backdrop-blur-sm"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
