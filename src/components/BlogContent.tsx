import type { BlogBlock } from "@/data/blog-posts";
import { Terminal } from "@/registry/magicui/terminal";
import { TerminalDemo2 } from "@/components/TerminalDemo2";

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
              <Terminal
                key={i}
                title={block.language ? `snippet.${block.language}` : "code"}
                className="my-6"
              >
                <pre className="text-[12px] font-mono leading-[1.5] overflow-x-auto text-neutral-300 whitespace-pre">
                  {block.text}
                </pre>
              </Terminal>
            );
          case "terminal":
            return <TerminalDemo2 key={i} />;
          case "list":
            return <ListBlock key={i} items={block.items} />;
        }
      })}
    </>
  );
}