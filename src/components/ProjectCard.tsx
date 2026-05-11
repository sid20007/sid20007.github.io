"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";
import { EditTool } from "@/components/ui/edit-tool";
import { GridWipeModal } from "@/components/ui/grid-wipe-modal";
import { techExplanations } from "@/data/tech-explanations";

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewState, setPreviewState] = useState<"waiting" | "pending" | "completed">("waiting");
  const [readmeContent, setReadmeContent] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const summarizeReadme = (text: string) => {
    const lines = text.split('\n');
    let overview = [];
    
    for (const line of lines) {
      // Stop at common technical headers
      if (line.match(/^##\s+(Installation|Getting Started|Usage|Setup|Development|License|Contributing)/i)) {
        overview.push("\n... [Visit GitHub for full details and instructions]");
        break;
      }
      overview.push(line);
      
      // Hard cap to keep the preview concise
      if (overview.length > 25) {
        overview.push("\n... [Visit GitHub for full details and instructions]");
        break;
      }
    }
    
    return overview.join('\n');
  };

  const handlePreview = async () => {
    if (!showPreview && !readmeContent && project.github) {
      setShowPreview(true);
      setPreviewState("pending");
      
      try {
        const repoPath = project.github.replace("https://github.com/", "");
        let res = await fetch(`https://raw.githubusercontent.com/${repoPath}/main/README.md`);
        if (!res.ok) {
          res = await fetch(`https://raw.githubusercontent.com/${repoPath}/master/README.md`);
        }
        
        if (res.ok) {
          const text = await res.text();
          setReadmeContent(summarizeReadme(text));
          setPreviewState("completed");
        } else {
          setReadmeContent("Failed to load README.md");
          setPreviewState("completed");
        }
      } catch (e) {
        setReadmeContent("Error loading README.md");
        setPreviewState("completed");
      }
    } else {
      setShowPreview(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative rounded-3xl border border-white/[0.06] bg-surface/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 min-w-0 flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] group-hover:scale-110 transition-transform duration-500">
              <svg className="w-4 h-4 text-[#a1a1aa] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-[#e4e4e7] group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-[#a1a1aa] leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => {
              const hasExplanation = !!techExplanations[tag];
              return (
                <button
                  key={tag}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse" && hasExplanation) {
                      setActiveTag(tag);
                    }
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") {
                      setActiveTag(null);
                    }
                  }}
                  onClick={(e) => {
                    if (hasExplanation) {
                      e.stopPropagation();
                      setActiveTag(activeTag === tag ? null : tag);
                    }
                  }}
                  className={`rounded-full border px-3 py-1 text-[10px] font-medium tracking-wider uppercase transition-all duration-300 cursor-help ${
                    activeTag === tag
                      ? "bg-[#e4e4e7] text-[#0a0a0b] border-[#e4e4e7]"
                      : "bg-white/[0.03] border-white/[0.04] text-[#71717a] hover:text-[#e4e4e7] hover:border-white/[0.12] hover:bg-white/[0.06]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-8 flex items-center justify-between pt-5 border-t border-white/[0.04]">
          <div className="flex items-center gap-4">
            {project.github && (
              <>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#71717a] hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  View Code
                </a>
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#71717a] hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Read Docs
                </button>
              </>
            )}
          </div>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase text-[#0a0a0b] bg-white rounded-full px-3 py-1.5 hover:scale-105 hover:bg-[#e4e4e7] transition-all"
            >
              View Live <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </a>
          )}
          {project.download && (
            <a
              href={project.download}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase text-[#0a0a0b] bg-white rounded-full px-3.5 py-1.5 hover:scale-105 hover:bg-[#e4e4e7] transition-all"
            >
              Download APK <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            </a>
          )}
        </div>

        <AnimatePresence>
          {activeTag && techExplanations[activeTag] && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 bg-[#0c0c0e]/95 backdrop-blur-md border-t border-white/[0.08] p-5 z-20 flex flex-col justify-center shadow-[0_-8px_24px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono tracking-widest text-[#71717a] uppercase">
                  {activeTag} — {techExplanations[activeTag].definition}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTag(null);
                  }}
                  className="text-[#71717a] hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                {techExplanations[activeTag].context}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <GridWipeModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={`${project.title} - README`}
      >
        <EditTool
          state={previewState}
          variant="write"
          filePath="README.md"
          newContent={readmeContent}
          className="dark bg-transparent border-none shadow-none"
        />
      </GridWipeModal>
    </>
  );
}