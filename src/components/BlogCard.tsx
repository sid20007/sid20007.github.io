import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-white/[0.06] py-6 last:border-b-0"
    >
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
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-[#71717a]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}