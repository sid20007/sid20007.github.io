import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="flex items-center justify-between px-6 sm:px-8 lg:px-12 py-8">
        <p className="text-xs text-[#71717a]">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4 pr-12 sm:pr-14">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#71717a] transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#71717a] transition-colors hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}