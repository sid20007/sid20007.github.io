export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: BlogBlock[];
}

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; text: string; language?: string }
  | { type: "terminal" }
  | { type: "list"; items: string[] };

export const blogPosts: BlogPost[] = [
  {
    slug: "scraping-the-college-portal",
    title: "Scraping the College Portal: An Engineering Case Study in Real-World Automation, UX, and Cloudflare Blocks",
    description: "A developer's journey of building a privacy-first, real-time attendance tracker on top of a legacy university portal, fighting headless browser detection, and designing for the anxious student.",
    date: "2026-05-12",
    readTime: "12 min read",
    tags: ["Next.js", "Playwright", "Web Scraping", "JavaScript"],
    content: [
      {
        type: "paragraph",
        text: `If you're an engineering student in India, the number 75 is basically a permanent background process running in your brain. It's the arbitrary, unforgiving line between academic survival and getting barred from writing your semester exams. Drop to 74.9%, and you're suddenly pleading with the department head or begging for medical certificates.`
      },
      {
        type: "paragraph",
        text: `At St. Aloysius College (SOE), our official source of truth for this metric is a portal called btechconnect.staloysius.edu.in. To be fair to the developers who built it, the database is accurate. But using the actual portal feels like loading a webpage in 2012 over a dial-up connection. It has zero mobile optimization, crashes when everyone tries to log in before exams, and forces you to re-type your credentials literally every single time you open the tab.`
      },
      {
        type: "paragraph",
        text: `But the real issue isn't the styling; it's the lack of empathy in how the data is presented. When you finally get the page to load, you are greeted with a dry, static HTML table that looks something like this:`
      },
      {
        type: "list",
        items: [
          "Engineering Chemistry: 32 conducted, 25 attended (78.1%)"
        ]
      },
      {
        type: "paragraph",
        text: `That raw percentage doesn't actually tell you what you need to know in the moment. As a student, your internal monologue is usually a series of highly anxious, algebra-heavy questions:`
      },
      {
        type: "list",
        items: [
          "\"I have a fever today. Can I skip this morning's double-slot lab without dropping below 75%?\"",
          "\"I'm currently at 68%. Exactly how many consecutive classes do I have to attend to get back to safety?\"",
          "\"There are only three weeks left in the semester. If I attend every single class from now on, is it mathematically possible for me to clear the bar, or am I already cooked?\""
        ]
      },
      {
        type: "paragraph",
        text: `To answer these, we were constantly whipping out our phone calculators or scribbling algebra on the back of notebooks. It was an inefficient, stressful ritual. I decided to build a solution: B.Tech Connect — Attendance Tracker. A clean, modern, privacy-first web application that scrapes the legacy portal in the background and translates raw tables into actionable, real-time math, wrapped in a premium dark-mode dashboard.`
      },
      {
        type: "heading",
        text: "Designing for clarity"
      },
      {
        type: "paragraph",
        text: `From day one, I knew I didn't want to build a simple wrapper that just re-formatted the portal's layout. I wanted to build a proactive, intelligent dashboard that understands student anxiety.`
      },
      {
        type: "list",
        items: [
          "No annoying sign-ups: I refused to build another \"Sign Up with Email\" flow. Students hate filling out forms. It had to be: type your portal ID, hit enter, and see your dashboard. Simple.",
          "Absolute privacy: Storing university passwords on a database is a security nightmare. If my database ever leaked, I'd be in serious trouble, and rightfully so. The credentials had to be used on-the-fly to negotiate a session, then immediately discarded.",
          "The \"Can I Bunk?\" Math: The app had to answer two primary questions for every subject: \"Can Skip\" (safe-to-bunk classes) and \"Must Attend\" (catch-up classes).",
          "Timetable Context: WhatsApp is filled with outdated PDF timetables. The dashboard should automatically know what classes are scheduled today and highlight them."
        ]
      },
      {
        type: "paragraph",
        text: `I wanted the user experience to feel snappy, responsive, and \"alive.\" Instead of a static spreadsheet, it had to feel like a premium financial dashboard—think Robinhood, but for tracking your academic credit.`
      },
      {
        type: "heading",
        text: "Architecture & tech stack"
      },
      {
        type: "paragraph",
        text: `I wanted to build this fast before the semester got too busy, so I kept the stack as lean as possible. No separate backend servers, no complex databases to manage. Just a single Next.js project.`
      },
      {
        type: "terminal"
      },
      {
        type: "heading",
        text: "Next.js 16 (App Router)"
      },
      {
        type: "paragraph",
        text: `I chose Next.js because it's a fantastic full-stack framework. The App Router allowed me to keep my frontend code and scraper logic colocated in a single project. The API routes serve as our backend, letting us spin up serverless functions (or standard Node environments) to run our automation logic without deploying a separate Express or FastAPI server.`
      },
      {
        type: "heading",
        text: "Why standard JavaScript for the scraper?"
      },
      {
        type: "paragraph",
        text: `I write a lot of TypeScript, but for the scraping layer, TS felt like a chore. The student portal changes its HTML structure randomly. When a selector breaks, I want to edit a JS file, hot-reload, and see the fix in milliseconds. Writing type definitions for messy HTML tables and casting every DOM node just slowed down my trial-and-error loop.`
      },
      {
        type: "heading",
        text: "Backend Structure & Auth: Moving Away from Insecure Patterns"
      },
      {
        type: "paragraph",
        text: `In early prototypes, developers often make the mistake of storing credentials or active portal session cookies in the browser's sessionStorage or localStorage. This is a massive security risk (susceptible to XSS attacks).`
      },
      {
        type: "paragraph",
        text: `To solve this, I designed a server-side session handler using the jose library for secure, encrypted JWT cookies:`
      },
      {
        type: "list",
        items: [
          "When a student enters their credentials on our login page, a POST request is sent to /api/attendance.",
          "The server spins up a Playwright headless instance, logs into btechconnect, and retrieves the authenticated session cookies.",
          "Instead of sending these raw cookies back to the client, the server packages them inside an encrypted JWT, signs it using a server-side SESSION_SECRET, and sets it as an HttpOnly, Secure, SameSite: Lax cookie named attendance_session.",
          "On subsequent requests, the client's browser automatically sends this cookie. The Next.js API decrypts it, extracts the target portal's session cookies, and directly calls the portal's APIs to fetch fresh data—completely bypassing the slow browser login flow."
        ]
      },
      {
        type: "heading",
        text: "Zero-Config Branch Derivation"
      },
      {
        type: "paragraph",
        text: `To keep onboarding down to a single click, I didn't want to ask users "What is your branch?". I dug into our university's registration patterns and wrote a utility in route.js to auto-derive their branch based on their register number ranges:`
      },
      {
        type: "code",
        text: `function deriveBranch(register_no) {
  const regNumber = parseInt(register_no, 10);
  if (isNaN(regNumber)) return "UNKNOWN";
  if (regNumber >= 25190101 && regNumber <= 25190157) return "CSE";
  if (regNumber >= 25191101 && regNumber <= 25191160) return "AIML";
  if (regNumber >= 25192101 && regNumber <= 25192151) return "ISE";
  if (regNumber >= 25195101 && regNumber <= 25195141) return "ECE";
  return "UNKNOWN";
}`,
        language: "javascript"
      },
      {
        type: "paragraph",
        text: `This single piece of logic automatically hooks the user into the correct branch timetable on their first login!`
      },
      {
        type: "heading",
        text: "Fighting Cloudflare"
      },
      {
        type: "paragraph",
        text: `Everything was running beautifully on my local machine. Then, around April 2025, the college portal team implemented Cloudflare Turnstile. Suddenly, my serverless deployments on Vercel started returning 403 Forbidden errors. My automated scraper was hitting a brick wall.`
      },
      {
        type: "paragraph",
        text: `This kicked off a two-week spiral of debugging. Locally, Playwright worked because it launched a real Chrome window on a residential IP. In the cloud, headless Chromium on an AWS or Vercel IP range is basically a giant flag waving "I AM A BOT" to Cloudflare.`
      },
      {
        type: "paragraph",
        text: `I spent weeks researching stealth automated browsers. In scraper.js, I implemented Playwright Stealth Plugins to override default automation flags, disabled AutomationControlled, and overrode navigator.webdriver:`
      },
      {
        type: "code",
        text: `await page.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});`,
        language: "javascript"
      },
      {
        type: "paragraph",
        text: `I also set realistic viewport dimensions, mimicked an en-US locale, set the timezone to Asia/Kolkata, used a common Windows user-agent, and added randomized delays (using Math.random()) to mimic human typing speeds when filling out the login form.`
      },
      {
        type: "paragraph",
        text: `Despite these efforts, cloud provider IP ranges (AWS, DigitalOcean, Vercel) are heavily blacklisted by Cloudflare. Running headless Chromium from these IPs was reliably fingerprinted and challenged.`
      },
      {
        type: "paragraph",
        text: `To solve this without paying for expensive residential proxy networks, I preserved the project as a fully functional local development application (which works beautifully on any domestic Wi-Fi connection) and archived the production cloud deployment. This was an invaluable lesson in the limitations of scraping as a backend strategy—at a certain scale, security walls require official APIs or user-cooperative scrapers (like browser extensions).`
      },
      {
        type: "heading",
        text: "Handling inconsistent edge cases"
      },
      {
        type: "paragraph",
        text: `Writing the attendance calculations seemed trivial at first, but edge cases quickly emerged. Solving the algebra for "Must Attend" classes was surprisingly tricky when dealing with discrete values.`
      },
      {
        type: "paragraph",
        text: `Let's say your target is 75% (T = 0.75). You've attended A classes out of N conducted. You want to find the number of consecutive classes x you must attend to satisfy: (A + x) / (N + x) >= T.`
      },
      {
        type: "paragraph",
        text: `Solving for x: A + x >= T(N + x) which simplifies to: x(1 - T) >= T * N - A. Thus: x >= (T * N - A) / (1 - T). Since classes are discrete integers, we take the ceiling: x = Math.ceil((T * N - A) / (1 - T)).`
      },
      {
        type: "paragraph",
        text: `But when I first implemented this, my console started throwing weird NaN and Infinity values. Why? If a student has 0 classes conducted so far (like in the first week of a semester), N is 0, and the formula breaks with division by zero or negative values. What if the max possible attendance they can achieve by the end of the semester is mathematically lower than 75%?`
      },
      {
        type: "paragraph",
        text: `In SubjectCard, I resolved these edge cases with rigorous safety guards:`
      },
      {
        type: "code",
        text: `const catchUpClasses = Math.ceil((targetDecimal * total - attended) / (1 - targetDecimal));
const safeToBunk = Math.floor((attended - (targetDecimal * total)) / targetDecimal);

const displaySafeToBunk = Math.max(0, safeToBunk);
const displayCatchUp = Math.max(0, catchUpClasses);`,
        language: "javascript"
      },
      {
        type: "paragraph",
        text: `If a student's maximum possible percentage (assuming they attend every remaining class until the last working day) drops below their target, the UI shifts to render a custom warning:`
      },
      {
        type: "code",
        text: `const exactRemaining = calculateExactRemaining(code, branch, endDate);
const projectedTotal = total + exactRemaining;
const maxPossiblePercent = ((attended + exactRemaining) / projectedTotal) * 100;`,
        language: "javascript"
      },
      {
        type: "paragraph",
        text: `Instead of displaying a confusing negative "Must Attend" number, the card displays a warning banner: "You're Cooked!" with the exact number of extra classes needed beyond the remaining schedule, preventing mathematical drift.`
      },
      {
        type: "heading",
        text: "UI/UX Design Thinking: Designing for Calm"
      },
      {
        type: "paragraph",
        text: `Student dashboards are usually ugly, cluttered spreadsheets that scream "You are failing!" at you. Because attendance tracking is linked to anxiety, I wanted the UI/UX of this app to feel calm, focused, and premium.`
      },
      {
        type: "list",
        items: [
          "Password Anxiety: Explicit subtext on login: \"We never store your password\" — Establishes immediate trust and transparency.",
          "Cluttered Timetables: \"Today's Hitlist\" Section — Filters the master timetable down to show only classes scheduled for the current day, showing a clean timeline.",
          "Visual Stress: Harmonious Dark Palette (#09090b and #18181b) with soft glassmorphism — Reduces eye strain during late-night scrolling.",
          "Mathematical Friction: Isolated \"Can Skip\" and \"Must Attend\" giant metrics — Gives the student their core answers within 500ms of looking at the page."
        ]
      },
      {
        type: "heading",
        text: "Dynamic Global Health Indicator"
      },
      {
        type: "paragraph",
        text: `To provide an instant overview, I wanted to avoid making the student read every single subject card to understand their standing. I built a Global Health Indicator using the student's profile photo:`
      },
      {
        type: "code",
        text: `let profileRingColor = 'border-[#D9A02A]/30';
let profileGlow = 'shadow-[0_0_15px_rgba(217,160,42,0.15)]';

if (subjects && subjects.length > 0) {
  const lowestPercent = subjects.reduce((min, s) => {
    const percent = (s.attended / s.total) * 100;
    return percent < min ? percent : min;
  }, 100);

  if (lowestPercent < 73) {
    profileRingColor = 'border-[#FF453A]/80';
    profileGlow = 'shadow-[0_0_20px_rgba(255,69,58,0.4)]';
  } else if (lowestPercent >= 73 && lowestPercent < 75) {
    profileRingColor = 'border-[#FFD60A]/80';
  } else {
    profileRingColor = 'border-emerald-500/80';
  }
}`,
        language: "javascript"
      },
      {
        type: "paragraph",
        text: `The profile picture's outer ring and ambient glow dynamically transition between green, yellow, and red based on the student's lowest subject percentage. It instantly signals whether they are fully safe, on the edge, or in danger.`
      },
      {
        type: "heading",
        text: "User Autonomy: Personalizing the Dashboard"
      },
      {
        type: "paragraph",
        text: `The official college database often imports names in rigid, all-caps strings or as raw register numbers. To make the dashboard feel personal, I added a feature that lets students simply click on their name in the header to edit it. This value is saved directly to their browser's localStorage and persists across sessions, giving them ownership of their dashboard.`
      },
      {
        type: "heading",
        text: "Performance & Optimization: Perceived Speed"
      },
      {
        type: "paragraph",
        text: `Scraping is slow. Logging into the student portal via Playwright takes anywhere from 4 to 8 seconds because of server lag on their end. To ensure this didn't ruin the user experience, I engineered several layers of optimization:`
      },
      {
        type: "list",
        items: [
          "Cookie Session Cache: Once a session cookie is obtained, we reuse it for up to 24 hours. The app checks if a valid session exists on mount; if it does, it directly fetches the data using rapid fetch() JSON requests, bringing page load speeds down to under 1.5 seconds.",
          "Optimistic UI and Bouncing Loaders: While a fresh login scraper runs, instead of showing a blank screen or a harsh spinner, we render a highly polished pulsing skeleton loader that mimics the final card layout, reducing the user's perceived wait time.",
          "Smart Re-validation Guard: When switching semesters, the application checks if the cached attendance data matches the requested semester. If it does, it skips the expensive backend API call entirely and renders instantly, preventing unnecessary load on our scraper server and the college portal."
        ]
      },
      {
        type: "heading",
        text: "What I Learned: Engineering Beyond the Code"
      },
      {
        type: "list",
        items: [
          "Security & Privacy are Non-Negotiable: When you build a tool that asks for college credentials, students will rightly hesitate. Securing the transport layer with HTTPS and using HttpOnly JWT cookies taught me how to architect secure sessions from the ground up.",
          "The \"Uncooperative Backend\" Dilemma: In personal projects, we usually write our own APIs. Working with a legacy, slow, third-party backend taught me how to write robust error handling. I had to build screenshots-on-fail and HTML logging to debug exactly why our scraper failed in serverless environments.",
          "Product Empathy: I realized that good software doesn't just calculate numbers; it manages emotion. Designing the \"Can Skip\" metric gave students immediate relief, while the \"You're Cooked\" warning gave them a realistic, albeit tough, reality check to take action."
        ]
      },
      {
        type: "heading",
        text: "Future Improvements: The Next Semester"
      },
      {
        type: "paragraph",
        text: `If I were to rebuild this project or scale it further, there are several key architectural changes I would explore:`
      },
      {
        type: "list",
        items: [
          "1. User-Cooperative Scraping (Chrome Extension): Instead of running Playwright on a cloud server (which is expensive and highly vulnerable to IP-based Cloudflare blocking), I would build a companion Chrome/Firefox Extension. The extension would scrape the data directly from the user's local machine (where they easily pass Cloudflare checks) and sync it to their local dashboard.",
          "2. Predictive Timetable Analytics: Integrating the historical timetable trends to predict the likelihood of surprise classes or holiday cancellations, giving students even more accurate \"Can Skip\" projections.",
          "3. Push Notifications: Alerting students when their attendance in a specific subject falls below 76%, acting as an early-warning system.",
          "4. PWA Integration: Adding full offline support via service workers so students can check their schedule and cached attendance when walking through the college's low-connectivity basement labs."
        ]
      },
      {
        type: "heading",
        text: "Final Reflection: Solving Your Own Problems"
      },
      {
        type: "paragraph",
        text: `Ultimately, this project represents the reason I got into software engineering.`
      },
      {
        type: "paragraph",
        text: `There is a unique thrill in looking at a clunky, frustrating daily process, sitting down with a text editor, and building a tool that makes life easier for yourself and your peers. Even though our cloud deployment is paused due to the ever-escalating bot-detection wars of the modern web, the engineering journey—from solving mathematical ceiling edge cases to wrapping Playwright inside containerized Docker builds—has been incredibly rewarding.`
      },
      {
        type: "paragraph",
        text: `It proved that with some reverse engineering, clean design, and focus, we can turn even the most boring, anxiety-inducing college spreadsheets into a premium, empowering user experience.`
      },
      {
        type: "paragraph",
        text: `Written by Sid, an ISE Student at St. Aloysius College (SOE).`
      },
      {
        type: "paragraph",
        text: `Find the repository on GitHub (https://github.com/sid20007).`
      }
    ]
  },
  {
    slug: "building-a-dht-in-go",
    title: "Building a Distributed Hash Table in Go",
    description:
      "From Chord paper to working implementation — lessons learned while building a DHT with consistent hashing and replication.",
    date: "2026-04-12",
    readTime: "12 min read",
    tags: ["Go", "Distributed Systems"],
    content: [
      {
        type: "paragraph",
        text: "The Chord protocol is one of the canonical distributed hash table designs — elegant in its simplicity, with a clean ring topology and logarithmic routing. But reading the paper and implementing it in Go are two very different experiences. This post covers the gap between theory and practice, and the design decisions that emerged along the way.",
      },
      {
        type: "heading",
        text: "The ring abstraction",
      },
      {
        type: "paragraph",
        text: "Chord organizes nodes in a circular identifier space of size 2^m. Each node and key gets an m-bit identifier via a consistent hash function. A key k is assigned to the first node whose identifier is equal to or follows k in the identifier space — the successor of k. This gives you a clean invariant: at any point, each node is responsible for the keys between its predecessor and itself.",
      },
      {
        type: "paragraph",
        text: "In Go, representing the ring starts with a sorted data structure. The naive approach is a sorted slice with binary search, but insertions and deletions are O(n). For a prototype that works fine. A production implementation would use a balanced tree or a skip list.",
      },
      {
        type: "code",
        text: `
type FingerEntry struct {
    Start uint64
    Node  *Node
}

type Node struct {
    ID        uint64
    Address   string
    Finger    []FingerEntry
    Successor *Node
    Predecessor *Node
    Data      map[string]string
}`,
        language: "go",
      },
      {
        type: "heading",
        text: "Finger tables and logarithmic routing",
      },
      {
        type: "paragraph",
        text: "The finger table is what gives Chord its O(log N) lookup performance. Each node maintains a table of size m where the i-th entry points to the successor of (n + 2^i). To find a key, you forward the query to the finger entry that most immediately precedes the target — each hop at least halves the remaining distance.",
      },
      {
        type: "paragraph",
        text: "Implementing this correctly requires careful handling of wraparound modulo 2^m. Go's uint64 arithmetic with overflow handled explicitly works well here. The more subtle challenge is maintaining finger tables under churn — nodes joining and leaving.",
      },
      {
        type: "code",
        text: `func (n *Node) ClosestPrecedingNode(id uint64) *Node {
    for i := len(n.Finger) - 1; i >= 0; i-- {
        if between(n.ID, id, n.Finger[i].Node.ID) {
            return n.Finger[i].Node
        }
    }
    return n
}

func between(a, x, b uint64) bool {
    if a < b {
        return a < x && x < b
    }
    return a < x || x < b
}`,
        language: "go",
      },
      {
        type: "heading",
        text: "Stabilization and eventual consistency",
      },
      {
        type: "paragraph",
        text: "Chord does not maintain correctness of successor pointers on every join or leave — that would be too expensive. Instead, each node runs a periodic stabilization protocol: it asks its successor for its predecessor, and if that node should be the new successor, it updates its pointer. Successor lists (keeping the k nearest successors) provide fault tolerance.",
      },
      {
        type: "paragraph",
        text: "In Go, this maps naturally to goroutines. Each node runs a stabilize loop with a configurable interval, communicating over gRPC. The key insight is that while individual pointers may be temporarily wrong, the system converges to correctness — as long as the stabilization interval is shorter than the mean time between failures.",
      },
      {
        type: "list",
        items: [
          "Stabilization converges in O(log N) rounds after a join or failure",
          "Successor lists of size k can tolerate up to k-1 simultaneous failures",
          "gRPC's deadline propagation helped prevent stabilization from hanging",
          "Running 100 nodes on a single machine surfaced race conditions invisible at small scale",
        ],
      },
      {
        type: "heading",
        text: "What I'd do differently",
      },
      {
        type: "paragraph",
        text: "The biggest lesson was that distributed systems testing is at least as hard as the implementation itself. Network partitions, slow nodes, and concurrent joins need systematic simulation. Jepsen-style testing with a deterministic scheduler would have caught several subtle bugs before they appeared in production-like environments.",
      },
      {
        type: "paragraph",
        text: "The full implementation is on GitHub — it's about 2,000 lines of Go with a CLI for running local clusters. If you're learning distributed systems, building a DHT end-to-end is one of the most rewarding projects you can take on.",
      },
    ],
  },
  {
    slug: "zero-downtime-migrations",
    title: "Zero-Downtime Database Migrations",
    description:
      "A practical guide to running schema changes on large Postgres tables without locking or downtime.",
    date: "2026-03-28",
    readTime: "8 min read",
    tags: ["PostgreSQL", "DevOps"],
    content: [
      {
        type: "paragraph",
        text: "Schema migrations are terrifying on large tables. A naive ALTER TABLE on a 50-million-row table can take an ACCESS EXCLUSIVE lock, blocking all reads and writes for minutes or hours. But with the right approach, you can run most migrations without any downtime at all.",
      },
      {
        type: "heading",
        text: "The problem with ALTER TABLE",
      },
      {
        type: "paragraph",
        text: "PostgreSQL acquires different lock levels for different DDL operations. Adding a nullable column takes a very brief ACCESS EXCLUSIVE lock (essentially instant). But adding a NOT NULL DEFAULT column on older versions could rewrite the entire table. Knowing your lock levels is step one.",
      },
      {
        type: "code",
        text: `-- Fast: only modifies catalog, no table rewrite
ALTER TABLE users ADD COLUMN timezone text;

-- Slow: requires table rewrite (Postgres < 11)
ALTER TABLE users ADD COLUMN status text NOT NULL DEFAULT 'active';

-- Fast in Postgres 11+: no rewrite needed
ALTER TABLE users ADD COLUMN status text NOT NULL DEFAULT 'active';`,
        language: "sql",
      },
      {
        type: "heading",
        text: "The expand-contract pattern",
      },
      {
        type: "paragraph",
        text: "The core idea is to split each migration into two phases. In the expand phase, you add new columns, tables, or indexes without removing anything old. Your application starts writing to both the old and new schema. Once that's deployed and stable, the contract phase removes the old schema and cleans up.",
      },
      {
        type: "paragraph",
        text: "For renaming a column, the process is: add the new column, deploy code that writes to both and reads from the new one with a fallback to the old one, backfill existing rows, switch reads to only the new column, then drop the old column. It's more steps, but each step is individually safe.",
      },
      {
        type: "list",
        items: [
          "Add new schema elements alongside existing ones",
          "Deploy application code that handles both states",
          "Backfill existing data in batches",
          "Validate no code depends on the old schema",
          "Remove old schema elements in a separate deployment",
        ],
      },
      {
        type: "heading",
        text: "Backfilling without locks",
      },
      {
        type: "paragraph",
        text: "Backfilling a new column on millions of rows needs to happen in small batches to avoid long-running transactions and lock contention. The recipe: update in batches of 1,000–10,000 rows with short sleeps between batches, using a WHERE clause that tracks progress by primary key rather than relying on a separate tracking table.",
      },
      {
        type: "code",
        text: `-- Batch backfill without a long-running transaction
DO $$
DECLARE
    batch_size INT := 5000;
    min_id BIGINT := 0;
    max_id BIGINT;
BEGIN
    SELECT MAX(id) INTO max_id FROM users;
    WHILE min_id < max_id LOOP
        UPDATE users
        SET status = COALESCE(legacy_status, 'active')
        WHERE id BETWEEN min_id AND min_id + batch_size;

        COMMIT;
        min_id := min_id + batch_size + 1;
        PERFORM pg_sleep(0.1);
    END LOOP;
END $$;`,
        language: "sql",
      },
      {
        type: "heading",
        text: "Verification and rollback",
      },
      {
        type: "paragraph",
        text: "Every migration should ship with a verification query and a rollback plan. Verification checks that the new column has expected values and no unexpected NULLs. The rollback plan isn't just the reverse DDL — it's a sequence that accounts for the fact that new data may have been written. If the migration has been live for three days, simply reverting the schema could lose data written during that window.",
      },
      {
        type: "paragraph",
        text: "These patterns have let us run hundreds of migrations on production tables with 100M+ rows without a single incident. The key principle: never do in one step what you can safely decompose into multiple safe steps.",
      },
    ],
  },
  {
    slug: "crdt-collaborative-editing",
    title: "How CRDTs Power Real-Time Collaboration",
    description:
      "An accessible introduction to conflict-free replicated data types and how they enable seamless real-time editing.",
    date: "2026-03-10",
    readTime: "15 min read",
    tags: ["CRDT", "TypeScript"],
    content: [
      {
        type: "paragraph",
        text: "Real-time collaboration feels like magic — multiple people typing in the same document, seeing each other's cursors, with no conflicts or lockouts. Behind this experience is a family of data structures called CRDTs: Conflict-free Replicated Data Types. This post explains how they work and how to implement one for collaborative text editing.",
      },
      {
        type: "heading",
        text: "Why not Operational Transformation?",
      },
      {
        type: "paragraph",
        text: "For years, the dominant approach was Operational Transformation, famously used by Google Docs. OT works by transforming operations against each other — if Alice inserts 'a' at position 3 and Bob deletes position 2, the server transforms Alice's operation to insert at position 2. This requires a central server to maintain a total order of operations, and the transformation functions grow quadratically with the number of operation types.",
      },
      {
        type: "paragraph",
        text: "CRDTs take a different approach. Instead of transforming operations, they use data structures that are mathematically guaranteed to converge — any two replicas that have seen the same set of updates will have the same state, regardless of the order they applied those updates. This means they work peer-to-peer with no central server.",
      },
      {
        type: "heading",
        text: "The core idea: monotonic joins",
      },
      {
        type: "paragraph",
        text: "A CRDT is defined by three properties. The state space forms a join-semilattice — a partially ordered set where any two elements have a least upper bound. All operations on the state are monotonic with respect to this order (state only moves \"up\"). And the merge of two states is their join — take the least upper bound of the two.",
      },
      {
        type: "code",
        text: `
class GCounter {
  private counts: Map<string, number> = new Map();

  increment(nodeId: string): void {
    const current = this.counts.get(nodeId) ?? 0;
    this.counts.set(nodeId, current + 1);
  }

  value(): number {
    return Array.from(this.counts.values())
      .reduce((sum, c) => sum + c, 0);
  }

  merge(other: GCounter): void {
    for (const [node, count] of other.counts) {
      const current = this.counts.get(node) ?? 0;
      this.counts.set(node, Math.max(current, count));
    }
  }
}`,
        language: "typescript",
      },
      {
        type: "heading",
        text: "Text editing with RGA",
      },
      {
        type: "paragraph",
        text: "For text editing, a common CRDT approach is the Replicated Growable Array (RGA). Each character in the document gets a globally unique identifier — typically a combination of a Lamport timestamp and the node's unique ID. Characters are ordered by their identifiers. When two users insert at the same position concurrently, the identifiers break the tie deterministically.",
      },
      {
        type: "paragraph",
        text: "Deletion is handled with tombstones — characters are marked as deleted rather than removed, so their identifiers can still be used for ordering subsequent insertions. This means the data structure grows monotonically, satisfying the CRDT lattice property. In practice, you periodically run garbage collection to prune tombstones below the oldest known version.",
      },
      {
        type: "code",
        text: `interface CharId {
  lamport: number;
  siteId: string;
}

interface Char {
  id: CharId;
  value: string;
  deleted: boolean;

  leftId: CharId | null;
  rightId: CharId | null;
}

class RGAText {
  private chars: Map<string, Char> = new Map();
  private siteId: string;
  private clock: number = 0;

  insert(pos: number, text: string): void {
    const leftId = this.findCharIdAt(pos - 1);
    const rightId = this.findCharIdAt(pos);

    for (const ch of text) {
      this.clock++;
      const id: CharId = { lamport: this.clock, siteId: this.siteId };
      this.chars.set(this.key(id), {
        id, value: ch, deleted: false, leftId, rightId
      });
      leftId = id;
    }
  }

  toString(): string {
    const result: string[] = [];
    let current = this.findStart();
    while (current) {
      if (!current.deleted) result.push(current.value);
      current = this.chars.get(this.key(current.rightId!)) ?? null;
    }
    return result.join('');
  }
}`,
        language: "typescript",
      },
      {
        type: "heading",
        text: "Trade-offs and practical considerations",
      },
      {
        type: "paragraph",
        text: "CRDTs have costs. The metadata overhead is significant — for text, each character carries an identifier and neighbor pointers, often 10-20x the size of the raw text. Tombstones grow unboundedly without GC. And the merge semantics, while mathematically clean, can produce surprising results. If two users edit the same sentence concurrently, the merged document interleaves their changes at character-level granularity, which is \"correct\" but may not be what either user intended.",
      },
      {
        type: "list",
        items: [
          "CRDTs enable true peer-to-peer collaboration with no central coordination",
          "The metadata overhead can be 10-20x the document size",
          "Tombstone GC is essential for long-lived documents",
          "Character-level merging is mathematically correct but may surprise users",
          "Modern editors often combine CRDTs with an authoritative server for UX polish",
        ],
      },
      {
        type: "paragraph",
        text: "The field is moving fast. Projects like Yjs and Automerge have made CRDTs practical for production applications, handling edge cases that took years to discover. If you're building a collaborative feature, start with one of these libraries rather than implementing RGA from scratch — the spec is 30 pages and the edge cases are subtle.",
      },
    ],
  },
  {
    slug: "rust-terminal-rendering",
    title: "GPU-Accelerated Terminal Rendering in Rust",
    description:
      "How we used WebGPU to render terminal output at 120fps, and the unexpected challenges of text shaping on the GPU.",
    date: "2026-02-22",
    readTime: "10 min read",
    tags: ["Rust", "WebGPU"],
    content: [
      {
        type: "paragraph",
        text: "Modern terminals still render text on the CPU, often at 30-60fps with visible flicker during rapid output. I wanted to see how fast we could go by moving the entire rendering pipeline to the GPU. The answer: 120fps on integrated graphics, with smooth scrolling through megabytes of output. But text on the GPU is surprisingly hard.",
      },
      {
        type: "heading",
        text: "Architecture overview",
      },
      {
        type: "paragraph",
        text: "The terminal is split into two processes: the PTY manager (handles the shell process, parses ANSI escape sequences, and maintains the grid state) and the renderer (takes the grid state and draws it via WebGPU). Communication happens over a shared ring buffer in memory.",
      },
      {
        type: "code",
        text: `struct GridCell {
    character: char,
    fg_color: Color,
    bg_color: Color,
    bold: bool,
    italic: bool,
    underline: bool,
}

struct Grid {
    cells: Vec<GridCell>,
    cursor_x: usize,
    cursor_y: usize,
    cols: usize,
    rows: usize,
    scrollback: VecDeque<Vec<GridCell>>,
}`,
        language: "rust",
      },
      {
        type: "heading",
        text: "Glyph caching with a texture atlas",
      },
      {
        type: "paragraph",
        text: "The naive approach — uploading each character as a separate texture — would be catastrophically slow. Instead, we maintain a texture atlas: a single large texture containing rasterized glyphs for every character-glyph combination we've seen. When a new glyph is needed, we render it with a CPU-side font rasterizer (using FreeType via the freetype-rs crate) and upload just that glyph's rectangle to the atlas.",
      },
      {
        type: "paragraph",
        text: "For a typical terminal session, the atlas stabilizes quickly — most people use at most a few hundred distinct characters. The GPU then draws each cell as a textured quad, with instanced rendering to batch all cells in a single draw call.",
      },
      {
        type: "code",
        text: `
#[repr(C)]
struct CellInstance {
    position: [f32; 2],
    tex_coords: [f32; 4],
    fg_color: [f32; 4],
    bg_color: [f32; 4],
    flags: u32,
}

render_pass.draw_indexed(
    0..6,
    0,
    0..visible_cells as u32,
);`,
        language: "rust",
      },
      {
        type: "heading",
        text: "The text shaping surprise",
      },
      {
        type: "paragraph",
        text: "I expected GPU rasterization to be the bottleneck. It wasn't. The bottleneck was text shaping — converting a sequence of characters into positioned glyphs, accounting for kerning, ligatures, and bidirectional text. This is inherently CPU-bound and sequential. For a 200×80 terminal (16,000 cells), running HarfBuzz shaping on every frame at 120fps means processing nearly 2 million cells per second.",
      },
      {
        type: "paragraph",
        text: "The solution was a shaping cache keyed by (font, characters, features). Most cells don't change between frames, and repeated shaping queries hit the cache. With a 10,000-entry LRU cache, the shaping hit rate exceeds 95% for typical workloads, bringing CPU usage down to under 5% per frame.",
      },
      {
        type: "list",
        items: [
          "GPU rendering achieved 120fps on integrated graphics with 200x80 cells",
          "Text shaping, not rasterization, was the actual bottleneck",
          "A shaping cache with 10k entries achieves >95% hit rate in practice",
          "ANSI escape sequence parsing is a second CPU bottleneck under rapid output",
          "The ring buffer between PTY manager and renderer keeps latency under 1ms",
        ],
      },
      {
        type: "heading",
        text: "Is this practical?",
      },
      {
        type: "paragraph",
        text: "For most users, the difference between 60fps and 120fps terminal rendering is subtle. But for specific workloads — watching build output scroll by, tailing high-throughput logs, running terminal-based visualizations — the smoothness is genuinely noticeable. More importantly, offloading rendering to the GPU frees the CPU for the shell and applications you actually care about.",
      },
    ],
  },
  {
    slug: "ebpf-observability",
    title: "Zero-Instrumentation Observability with eBPF",
    description:
      "Using eBPF probes to collect traces and metrics without touching application code.",
    date: "2026-01-14",
    readTime: "9 min read",
    tags: ["eBPF", "Observability"],
    content: [
      {
        type: "paragraph",
        text: "Instrumenting every service in a distributed system is expensive and fragile. Libraries drift out of date, different languages need different SDKs, and some services can't be modified at all. eBPF offers a compelling alternative: attach probes to kernel and userspace events, and collect telemetry without touching a single line of application code.",
      },
      {
        type: "heading",
        text: "How eBPF works",
      },
      {
        type: "paragraph",
        text: "eBPF programs are small, sandboxed programs that run in the Linux kernel. They're verified for safety — no infinite loops, no out-of-bounds memory access — and JIT-compiled to native instructions. You attach them to hooks: kprobes for kernel functions, uprobes for userspace functions, tracepoints for static kernel instrumentation points, and more.",
      },
      {
        type: "code",
        text: `
#include <linux/bpf.h>
#include <bpf/bpf_helpers.h>

struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 1024);
    __type(key, u16);
    __type(value, u64);
} tcp_conn_count SEC(".maps");

SEC("kprobe/tcp_v4_connect")
int trace_tcp_connect(struct pt_regs *ctx) {

    struct sock *sk = (struct sock *)PT_REGS_PARM1(ctx);
    u16 dport = sk->__sk_common.skc_dport;
    dport = __builtin_bswap16(dport);

    u64 *count = bpf_map_lookup_elem(&tcp_conn_count, &dport);
    if (count) {
        __sync_fetch_and_add(count, 1);
    } else {
        u64 init = 1;
        bpf_map_update_elem(&tcp_conn_count, &dport, &init, BPF_ANY);
    }
    return 0;
}

char LICENSE[] SEC("license") = "GPL";`,
        language: "c",
      },
      {
        type: "heading",
        text: "HTTP tracing without touching the application",
      },
      {
        type: "paragraph",
        text: "For HTTP services, the most valuable signal is the request-response lifecycle: method, path, status code, latency. With eBPF, you can attach uprobes to common HTTP library functions — Go's net/http, Python's WSGI, Node's HTTP parser — and extract the same data without an SDK.",
      },
      {
        type: "paragraph",
        text: "The approach is to probe the function that writes the response header. At that point, the request is parsed and the status code is known. You read the request data from the socket buffer or from function arguments, compute latency from a timestamp saved when the connection was accepted, and emit the span to a userspace collector via a BPF ring buffer.",
      },
      {
        type: "heading",
        text: "The limitations",
      },
      {
        type: "paragraph",
        text: "eBPF observability isn't a complete replacement for application-level instrumentation. Internal function spans, business-logic metrics, and structured log events still need SDKs. eBPF excels at the system boundary: network calls, disk I/O, scheduling latency, memory allocation patterns. The best observability strategy layers eBPF for infrastructure signals with lightweight SDKs for application-specific telemetry.",
      },
      {
        type: "list",
        items: [
          "eBPF provides observability with zero code changes",
          "Best suited for infrastructure signals: networking, I/O, scheduling",
          "Application-level business metrics still benefit from SDKs",
          "Performance overhead is typically under 1% CPU",
          "BPF CO-RE (Compile Once, Run Everywhere) solves kernel portability",
        ],
      },
      {
        type: "heading",
        text: "Getting started",
      },
      {
        type: "paragraph",
        text: "The tooling ecosystem has matured significantly. libbpf and its Rust bindings provide a safe, high-level interface for writing BPF programs. Projects like Cilium's Tetragon and Pixie give you production-ready eBPF observability without writing kernel code yourself. If you're responsible for a fleet of services and want better observability without touching every codebase, eBPF is worth the investment.",
      },
      {
        type: "paragraph",
        text: "We deployed eBPF-based HTTP tracing across 200 services and got useful latency and error-rate data within a day — no code changes, no redeploys. That kind of velocity is hard to beat with traditional instrumentation.",
      },
    ],
  },
];