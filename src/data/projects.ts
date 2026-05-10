export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "CareTrack",
    description:
      "Production-ready healthcare monitoring bot with comprehensive patient records management, Telegram integration, and secure data cleanup logic.",
    tags: ["Next.js", "Telegram Bot", "PostgreSQL"],
    github: "https://github.com/sid20007/caretrack",
    live: "https://caretrack.live",
    featured: true,
  },
  {
    title: "SOE Attendance Tracker",
    description:
      "Automated attendance scraper for B.Tech students using Playwright and Chromium to bypass Cloudflare Turnstile security challenges.",
    tags: ["JavaScript", "Playwright", "Web Scraping"],
    github: "https://github.com/sid20007/soe-attendace-tracker",
    live: "https://github.com/sid20007/soe-attendace-tracker",
    featured: true,
  },
  {
    title: "5G Connection Guard",
    description:
      "A native Android app that alerts users when their 5G signal unexpectedly drops to 4G/LTE to prevent data interruptions.",
    tags: ["Kotlin", "Android", "Networking"],
    github: "https://github.com/sid20007/5G-Connection-Guard-by-sid",
    featured: false,
  },
];