"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import SocialLinks from "@/components/SocialLinks";
import ButtonWithIcon from "@/components/ui/button-with-icon";

import { projects } from "@/data/projects";
import { techStack, categories } from "@/data/tech-stack";
import { siteConfig } from "@/data/site";

/* Dynamically import the WebGL effect — no SSR, and only load on client */
const CanvasRevealEffect = dynamic(
  () =>
    import("@/components/ui/sign-in-flow-1").then(
      (mod) => mod.CanvasRevealEffect
    ),
  { ssr: false }
);

const featured = projects.filter((p) => p.featured);

export default function Home() {
  /* Detect low-power / mobile devices to skip heavy WebGL */
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isLowPower =
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;
    // Show canvas on desktop or capable devices
    setShowCanvas(!isMobile || !isLowPower);
  }, []);

  return (
    <div className="relative">
      {/* Dot matrix background — spans entire page */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {showCanvas ? (
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-transparent"
            colors={[
              [255, 255, 255],
              [200, 200, 220],
            ]}
            dotSize={4}
            showGradient={false}
            opacities={[
              0.05, 0.05, 0.08, 0.08, 0.1, 0.12, 0.12, 0.15, 0.15, 0.2,
            ]}
          />
        ) : (
          /* CSS-only fallback for mobile lightweight static dots */
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.15), transparent),
                radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.1), transparent),
                radial-gradient(1px 1px at 40% 15%, rgba(255,255,255,0.12), transparent),
                radial-gradient(1px 1px at 55% 65%, rgba(255,255,255,0.15), transparent),
                radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.1), transparent),
                radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.12), transparent),
                radial-gradient(1px 1px at 15% 80%, rgba(255,255,255,0.08), transparent),
                radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.1), transparent),
                radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.12), transparent),
                radial-gradient(1px 1px at 35% 90%, rgba(255,255,255,0.08), transparent)
              `,
              backgroundSize:
                "200px 200px, 250px 250px, 180px 180px, 220px 220px, 300px 300px, 160px 160px, 280px 280px, 240px 240px, 190px 190px, 270px 270px",
            }}
          />
        )}
        {/* Fade gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-white mb-2 sm:mb-3">
            Siddharth.
          </h1>
          <h2 className="text-lg sm:text-xl font-medium text-[#e4e4e7] mb-6 sm:mb-8 tracking-tight">
            Full-Stack Engineer & UI Builder
          </h2>
          <p className="max-w-xl text-base sm:text-[1.125rem] text-[#a1a1aa] leading-relaxed text-balance px-4">
            {siteConfig.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-10"
        >
          <SocialLinks />
        </motion.div>
      </section>


      {/* Featured Projects */}
      <AnimatedSection
        delay={0.1}
        className="py-20 sm:py-24 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"
      >
        <SectionHeading
          label="Projects"
          title="Featured work"
          description="A few things I've built recently."
        />
        <div>
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </AnimatedSection>

      {/* Tech Stack */}
      <AnimatedSection
        delay={0.1}
        className="py-20 sm:py-24 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"
      >
        <SectionHeading
          label="Stack"
          title="Technologies"
          description="Tools and technologies I work with."
        />
        <div className="space-y-10">
          {categories.map(({ key, label }) => {
            const items = techStack.filter((t) => t.category === key);
            return (
              <div key={key}>
                <h4 className="text-[11px] font-medium uppercase tracking-widest text-[#52525b] mb-3">
                  {label}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 text-sm font-medium text-[#a1a1aa] hover:border-white/[0.1] hover:text-white transition-colors"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection
        delay={0.1}
        className="py-20 sm:py-24 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"
      >
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#e4e4e7] text-balance">
            Let&apos;s build something.
          </h2>
          <p className="mt-3 text-sm text-[#a1a1aa] max-w-md mx-auto leading-relaxed text-balance">
            I&apos;m always open to interesting conversations. Reach out if you
            want to collaborate or just say hello.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonWithIcon
              label="Get in touch"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.links.email}`}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}