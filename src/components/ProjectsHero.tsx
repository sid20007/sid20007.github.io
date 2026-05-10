'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProjectsHero() {
  useEffect(() => {
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const containers = document.querySelectorAll('[data-us-project]');
      containers.forEach(container => {
        container.querySelectorAll('*').forEach(el => {
          const text = (el.textContent || '').toLowerCase();
          const title = (el.getAttribute('title') || '').toLowerCase();
          const href = (el.getAttribute('href') || '').toLowerCase();
          if (
            text.includes('made with') || text.includes('unicorn') ||
            title.includes('made with') || title.includes('unicorn') ||
            href.includes('unicorn.studio')
          ) {
            (el as HTMLElement).style.display = 'none';
            try { el.remove(); } catch (e) { /* noop */ }
          }
        });
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 50);
    setTimeout(hideBranding, 1000);
    setTimeout(hideBranding, 5000);

    return () => {
      clearInterval(interval);
      try {
        document.head.removeChild(embedScript);
        document.head.removeChild(style);
      } catch (e) { /* noop */ }
    };
  }, []);

  return (
    <section className="relative overflow-hidden mb-12">
      {/* Background Animation — desktop only */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: '100%', height: '100%', minHeight: '420px' }}
        />
      </div>

      {/* Mobile stars fallback */}
      <div className="absolute inset-0 w-full h-full lg:hidden opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent)
          `,
          backgroundSize: '200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%',
        }}
      />

      {/* Mask gradient — blends into page bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b] z-[1]" />

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 lg:w-10 lg:h-10 border-t border-l border-white/20 z-20" />
      <div className="absolute top-0 right-0 w-6 h-6 lg:w-10 lg:h-10 border-t border-r border-white/20 z-20" />
      <div className="absolute bottom-0 left-0 w-6 h-6 lg:w-10 lg:h-10 border-b border-l border-white/20 z-20" />
      <div className="absolute bottom-0 right-0 w-6 h-6 lg:w-10 lg:h-10 border-b border-r border-white/20 z-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 sm:py-36 min-h-[380px]">
        {/* Top decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.5, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-12 h-px bg-white/40" />
          <span className="text-[#a1a1aa] text-[10px] font-mono tracking-[0.3em]">PROJECTS</span>
          <div className="w-12 h-px bg-white/40" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#e4e4e7] mb-4"
        >
          Building in the open.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-md text-sm sm:text-base text-[#a1a1aa] leading-relaxed text-balance"
        >
          Side projects, experiments, and open-source work. Every line of code is a step forward.
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
      </div>
    </section>
  );
}
