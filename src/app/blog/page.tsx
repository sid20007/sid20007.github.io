"use client";

import PageHeader from "@/components/PageHeader";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog-posts";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="relative min-h-screen">
      {/* Subtle, neutral dot grid background specific to the blog */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />
      
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <PageHeader
          title="Blog"
          description="Thoughts on distributed systems, type systems, and the craft of software engineering."
        />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="pb-24"
      >
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </motion.div>
      </div>
    </div>
  );
}