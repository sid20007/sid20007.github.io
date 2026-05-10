import type { BlogBlock } from "@/data/blog-posts";
import { EditTool } from "@/components/ui/edit-tool";

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-[#a1a1aa] leading-relaxed">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52525b]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BlogContent({ content }: { content: BlogBlock[] }) {
  return (
    <>
      {content.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="mt-12 mb-4 text-xl font-semibold tracking-tight text-[#e4e4e7]"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={i}
                className="my-4 text-sm text-[#a1a1aa] leading-relaxed"
              >
                {block.text}
              </p>
            );
          case "code":
            return (
              <EditTool
                key={i}
                variant="write"
                state="completed"
                filePath={block.language ? `snippet.${block.language}` : "code"}
                newContent={block.text}
                className="dark my-6 border-white/[0.06] bg-black"
              />
            );
          case "list":
            return <ListBlock key={i} items={block.items} />;
        }
      })}
    </>
  );
}