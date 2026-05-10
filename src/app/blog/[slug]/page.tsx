import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogContent from "@/components/BlogContent";
import BlogTOC from "@/components/BlogTOC";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogTOC />
      <article className="pt-24 pb-24 max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <Link
            href="/blog"
            className="text-xs font-medium text-[#71717a] hover:text-[#a1a1aa] transition-colors"
          >
            &larr; All posts
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#e4e4e7] leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-xs text-[#71717a]">
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

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-[#71717a]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <BlogContent content={post.content} />

        <div className="mt-20 pt-8 border-t border-white/[0.06]">
          <Link
            href="/blog"
            className="text-sm font-medium text-[#e4e4e7] hover:text-white transition-colors"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </article>
    </>
  );
}