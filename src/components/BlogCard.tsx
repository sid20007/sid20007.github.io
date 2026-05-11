import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@/data/blog-posts";
import { techExplanations } from "@/data/tech-explanations";

export default function BlogCard({ post }: { post: BlogPost }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div className="relative group border-b border-white/[0.06] py-6 last:border-b-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-center gap-3 text-xs text-[#71717a] mb-1.5">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-[#3f3f46]">·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-base font-medium text-[#e4e4e7] group-hover:text-white transition-colors">
          {post.title}
        </h3>
        <p className="mt-1.5 text-sm text-[#a1a1aa] leading-relaxed max-w-xl">
          {post.description}
        </p>
      </Link>
      
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => {
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
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveTag(activeTag === tag ? null : tag);
                }
              }}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all duration-300 cursor-help ${
                activeTag === tag
                  ? "bg-[#e4e4e7] text-[#0a0a0b] border-[#e4e4e7]"
                  : "bg-white/[0.04] border-transparent text-[#71717a] hover:text-[#e4e4e7] hover:border-white/[0.12]"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeTag && techExplanations[activeTag] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="overflow-hidden"
          >
            <div className="mt-3.5 p-3.5 rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-md flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono tracking-widest text-[#71717a] uppercase">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}