"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { CosmicSpectrum } from "@/components/ui/cosmos-spectrum";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {}
      <section className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 sm:pt-40 sm:pb-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#52525b] mb-6">
            Get in touch
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#e4e4e7] leading-tight">
            Let&apos;s work together.
          </h1>
          <p className="mt-4 max-w-md mx-auto text-sm sm:text-base text-[#71717a] leading-relaxed">
            Got an idea, a project, or just want to say hi? Reach out directly.
          </p>
        </motion.div>

        {}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.links.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-50 pointer-events-auto group mt-12 sm:mt-16 flex flex-col items-center gap-3"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#e4e4e7] transition-colors duration-300 group-hover:text-white"
          >
            {siteConfig.links.email}
          </motion.span>
          <span className="h-px w-full bg-gradient-to-r from-transparent via-[#a1a1aa]/40 to-transparent transition-all duration-500 group-hover:via-white/60" />
          <span className="text-xs text-[#52525b] tracking-wide transition-colors group-hover:text-[#a1a1aa]">
            Click to open mail →
          </span>
        </a>
      </section>

      {}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 mx-auto max-w-2xl px-6 sm:px-8 pb-32"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111113]/60 backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#52525b] mb-1">
              Status
            </p>
            <p className="text-sm text-[#e4e4e7]">Available for work</p>
          </div>

          {}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111113]/60 backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center text-[#a1a1aa]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#52525b] mb-1">
              Response
            </p>
            <p className="text-sm text-[#e4e4e7]">Within 24 hours</p>
          </div>

          {}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111113]/60 backdrop-blur-sm p-6 text-center">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center text-[#a1a1aa]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#52525b] mb-1">
              Based in
            </p>
            <p className="text-sm text-[#e4e4e7]">India</p>
          </div>
        </div>

        {}
        <div className="mt-8 flex items-center justify-center gap-5">
          {siteConfig.links.github && (
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#52525b] hover:text-white transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {siteConfig.links.linkedin && (
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#52525b] hover:text-white transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          )}
        </div>
      </motion.div>

      {}
      <CosmicSpectrum color="blue-black" blur />
    </div>
  );
}