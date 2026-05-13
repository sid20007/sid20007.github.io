"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/registry/magicui/terminal"

export function TerminalDemo2() {
  return (
    <Terminal className="my-6">
      <TypingAnimation delay={0}>$ node scraper.js --user=SOE24098 --debug</TypingAnimation>

      <AnimatedSpan delay={1500} className="text-neutral-500">
        [playwright] launching chromium (headless=true)...
      </AnimatedSpan>

      <AnimatedSpan delay={2200} className="text-neutral-500">
        [playwright] navigating to btechconnect.staloysius.edu.in...
      </AnimatedSpan>

      <AnimatedSpan delay={3000} className="text-blue-400">
        [playwright] turnstile challenge... bypassed! (1.4s)
      </AnimatedSpan>

      <AnimatedSpan delay={3800} className="text-neutral-500">
        [playwright] entering credentials... logged in.
      </AnimatedSpan>

      <AnimatedSpan delay={4600} className="text-neutral-500">
        [scraper] parsing raw table DOM... found 6 subjects.
      </AnimatedSpan>

      <AnimatedSpan delay={5400} className="text-emerald-400">
        [scraper] Chem: 78.1% (32 conducted, 25 attended) -&gt; Can Bunk: 1
      </AnimatedSpan>

      <AnimatedSpan delay={6200} className="text-rose-400">
        [scraper] Math: 70.0% (40 conducted, 28 attended) -&gt; Must Attend: 8
      </AnimatedSpan>

      <AnimatedSpan delay={7000} className="text-green-500 font-semibold">
        [session] cookies packaged in secure JWT -&gt; SUCCESS
      </AnimatedSpan>
    </Terminal>
  )
}