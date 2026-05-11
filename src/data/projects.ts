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
      "A production-ready Telegram bot that automates healthcare monitoring and patient record management. Built with secure cascading data cleanup to maintain consistency and reduce administrative overhead.",
    tags: ["Next.js", "Telegram Bot", "PostgreSQL"],
    github: "https://github.com/sid20007/caretrack",
    live: "https://caretrack.live",
    featured: true,
  },
  {
    title: "SOE Attendance Tracker",
    description:
      "Automates attendance tracking for students, eliminating the need to manually check portals. Reliably bypasses complex Cloudflare Turnstile security using Playwright and custom Chromium builds.",
    tags: ["JavaScript", "Playwright", "Web Scraping"],
    github: "https://github.com/sid20007/soe-attendace-tracker",
    live: "https://soe-attendace-tracker.vercel.app",
    featured: true,
  },
  {
    title: "5G Connection Guard",
    description:
      "A native Android app that prevents unexpected data interruptions by proactively alerting users the moment their network drops from 5G to 4G/LTE.",
    tags: ["Kotlin", "Android", "Networking"],
    github: "https://github.com/sid20007/5G-Connection-Guard-by-sid",
    featured: false,
  },
];