"use client";

import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Stars background — spans the entire page */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 40% 15%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 55% 65%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 15% 80%, rgba(255,255,255,0.15), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 35% 90%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1.5px 1.5px at 5% 55%, rgba(255,255,255,0.15), transparent),
            radial-gradient(1.5px 1.5px at 60% 5%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 75% 85%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 20% 60%, rgba(255,255,255,0.15), transparent),
            radial-gradient(1px 1px at 45% 35%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1.5px 1.5px at 95% 45%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.15), transparent),
            radial-gradient(1px 1px at 65% 95%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 80% 55%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1.5px 1.5px at 12% 40%, rgba(255,255,255,0.18), transparent)
          `,
          backgroundSize:
            "200px 200px, 250px 250px, 180px 180px, 220px 220px, 300px 300px, 160px 160px, 280px 280px, 240px 240px, 190px 190px, 270px 270px, 210px 210px, 230px 230px, 260px 260px, 170px 170px, 290px 290px, 200px 200px, 250px 250px, 180px 180px, 220px 220px, 300px 300px",
        }}
      />

      {/* Twinkling overlay layer */}
      <div
        className="pointer-events-none fixed -inset-10 z-0 stars-twinkle scale-110"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 18% 25%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 52% 42%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1.5px 1.5px at 78% 68%, rgba(255,255,255,0.45), transparent),
            radial-gradient(1.5px 1.5px at 38% 88%, rgba(255,255,255,0.35), transparent),
            radial-gradient(2px 2px at 88% 22%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1.5px 1.5px at 8% 72%, rgba(255,255,255,0.4), transparent)
          `,
          backgroundSize: "350px 350px, 400px 400px, 300px 300px, 380px 380px, 420px 420px, 360px 360px",
        }}
      />
      <div
        className="pointer-events-none fixed -inset-10 z-0 stars-twinkle-slow scale-110"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 42% 18%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 72% 82%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1.5px 1.5px at 22% 52%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 92% 38%, rgba(255,255,255,0.3), transparent)
          `,
          backgroundSize: "450px 450px, 380px 380px, 320px 320px, 400px 400px",
        }}
      />

      {/* Hero section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-28 pb-16 sm:pt-36 sm:pb-20">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 lg:w-10 lg:h-10 border-t border-l border-white/15" />
        <div className="absolute top-0 right-0 w-6 h-6 lg:w-10 lg:h-10 border-t border-r border-white/15" />

        {/* Top decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.5, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-12 h-px bg-white/40" />
          <span className="text-[#a1a1aa] text-[10px] font-mono tracking-[0.3em]">
            PROJECTS
          </span>
          <div className="w-12 h-px bg-white/40" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4"
        >
          Building in the open.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.35,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="max-w-md text-sm sm:text-base text-[#a1a1aa] leading-relaxed text-balance"
        >
          Side projects, experiments, and open-source work. Every line of code
          is a step forward.
        </motion.p>

        {/* Dot pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden sm:flex gap-1 mt-6"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 bg-white rounded-full" />
          ))}
        </motion.div>

        {/* Bottom notation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hidden sm:flex items-center gap-2 mt-8 text-[9px] font-mono text-[#71717a]"
        >
          <span>∞</span>
          <div className="w-16 h-px bg-white/20" />
          <span>SID.PROJECTS</span>
        </motion.div>
      </section>

      {/* Project cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 pb-24 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>

      {/* Bottom corner accents */}
      <div className="absolute bottom-0 left-0 w-6 h-6 lg:w-10 lg:h-10 border-b border-l border-white/15 z-10" />
      <div className="absolute bottom-0 right-0 w-6 h-6 lg:w-10 lg:h-10 border-b border-r border-white/15 z-10" />
    </div>
  );
}