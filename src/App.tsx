import { useEffect, useRef, useState, useCallback, type MouseEvent } from "react";
import "./styles/editorial.css";

type Route = "home" | "work" | "writing" | "about" | "side-projects" | "shelf";

function parseRoute(pathname: string): Route {
  const p = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  if (p.startsWith("/work")) return "work";
  if (p.startsWith("/shelf")) return "shelf";
  if (p.startsWith("/about")) return "about";
  if (p.startsWith("/side-projects")) return "side-projects";
  if (p.startsWith("/writing")) return "writing";
  return "home";
}

export default function Prototype({ initialPath }: { initialPath?: string } = {}) {
  const [route, setRoute] = useState<Route>(() => {
    const path = initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
    return parseRoute(path);
  });
  const homeVisitCount = useRef(0);

  // SPA navigation helper - intercepts clicks on internal links
  const handleNav = useCallback((e: MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || !href.startsWith("/") || href.startsWith("//")) return;
    if (anchor.target === "_blank") return;
    // In-page scroll anchors (e.g. #origin) - let browser handle
    if (href.includes("#")) return;
    e.preventDefault();
    if (href !== window.location.pathname) {
      window.history.pushState(null, "", href);
      setRoute(parseRoute(href));
    }
  }, []);

  // Handle legacy hash routes - redirect #/work to /work
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/")) {
      const path = hash.slice(1); // "#/work" -> "/work"
      window.history.replaceState(null, "", path === "/home" ? "/" : path);
      setRoute(parseRoute(path));
    }
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  // Scroll reveal
  useEffect(() => {
    if (route !== "about" && route !== "side-projects" && route !== "writing") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const elements = document.querySelectorAll(".passage, .beat");
    elements.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [route]);

  // Handle expected iframe rejection locally without crashing
  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message =
        typeof event.reason === "string"
          ? event.reason
          : event.reason instanceof Error
            ? event.reason.message
            : "";

      if (message.includes("Iframe not available")) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () =>
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
  }, []);

  return (
    <div className="site" onClick={handleNav}>

      {route === "home" && <Home revisit={homeVisitCount.current++ > 0} />}
      {route === "work" && <WorkPage />}
      {route === "about" && <AboutPage />}
      {route === "side-projects" && <SideProjectsPage />}
      {route === "writing" && <WritingPage />}
      {route === "shelf" && <ShelfPage />}
    </div>
  );
}

const TYPED_LINES = [
  "Technical Product Manager at the intersection of AI and people.",
  "The one in the room asking 'but what problem are we actually solving?'",
  "Building products in early-stage and growth environments since 2021.",
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.3 6.92 1.96 1.96 0 0 0 5.25 3Zm15.19 9.9c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.09-3.38 1.85V8.5H9.38c.04.78 0 11.5 0 11.5h3.36v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.38 1.89-1.38 1.33 0 1.87 1.01 1.87 2.5V20H20v-7.1Z" fill="currentColor"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.85.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.9c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.95-2.33 4.82-4.56 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .28.18.6.69.5A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" fill="currentColor"/>
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h10.25A1.75 1.75 0 0 1 18 5.75V18a2 2 0 0 0 2 2H7.25A2.75 2.75 0 0 1 4.5 17.25V5.5Zm2 .5v11.25c0 .41.34.75.75.75H16V6H6.5Zm12 2.25V18a3.95 3.95 0 0 0 .4 2H20a.5.5 0 0 0 0-1h-.5V8.25h-1Z" fill="currentColor"/>
    </svg>
  );
}

function useTypedLine(lines: string[], skipInitialDelay = false) {
  const ref = useRef<HTMLSpanElement>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    if (ref.current) ref.current.textContent = "";

    // Respect prefers-reduced-motion: show first line statically
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = lines[0];
      return;
    }

    const timers: number[] = [];

    function typeText(text: string): Promise<void> {
      return new Promise((resolve) => {
        let i = 0;
        const id = setInterval(() => {
          if (cancelledRef.current || !ref.current) { clearInterval(id); return; }
          ref.current.textContent += text[i++];
          if (i >= text.length) { clearInterval(id); resolve(); }
        }, 30) as unknown as number;
        timers.push(id);
      });
    }

    function eraseText(): Promise<void> {
      return new Promise((resolve) => {
        const id = setInterval(() => {
          if (cancelledRef.current || !ref.current) { clearInterval(id); return; }
          ref.current.textContent = ref.current.textContent!.slice(0, -1);
          if (!ref.current.textContent!.length) { clearInterval(id); resolve(); }
        }, 18) as unknown as number;
        timers.push(id);
      });
    }

    function delay(ms: number) {
      return new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          if (cancelledRef.current) return;
          resolve();
        }, ms) as unknown as number;
        timers.push(id);
      });
    }

    async function cycle() {
      let idx = 0;
      // Skip initial pause on revisit for instant feel
      if (!skipInitialDelay) {
        await delay(1600);
      }
      while (!cancelledRef.current) {
        await typeText(lines[idx]);
        if (cancelledRef.current) break;
        await delay(3200);
        if (cancelledRef.current) break;
        await eraseText();
        if (cancelledRef.current) break;
        await delay(400);
        idx = (idx + 1) % lines.length;
      }
    }

    cycle();

    return () => {
      cancelledRef.current = true;
      timers.forEach((id) => { clearInterval(id); clearTimeout(id); });
    };
  }, [lines, skipInitialDelay]);

  return ref;
}

function Home({ revisit = false }: { revisit?: boolean }) {
  const typedRef = useTypedLine(TYPED_LINES, revisit);

  return (
    <main className={`page${revisit ? " revisit" : ""}`}>
      <div className="v-rule"></div>

      <div className="status-block">
        <p><span className="status-dot"></span>Available for new work</p>
        <p>Technical PM · Part-time writer</p>
      </div>

      <div className="centre">
        <p className="centre-kicker" style={{ fontWeight: 500 }}>
          <img src="/favicon.ico" alt="" className="kicker-avatar" aria-hidden="true" width={20} height={20} />
          Hi, I'm Oluwafemi Joshua
        </p>
        <h1 className="centre-headline">
          I build products<br />worth getting<br /><em>obsessed with.</em>
        </h1>
        <p className="centre-roleline">Technical Product Manager & <span>Writer</span></p>
        <p className="centre-question">
          <span ref={typedRef}></span>
          <span className="typed-cursor" aria-hidden="true"></span>
        </p>
        <div className="centre-nav">
          <a href="/work" data-hoverable="true">How I work</a>
          <a href="/writing" data-hoverable="true">Writing</a>
          <a href="/about" data-hoverable="true">Working with me</a>
          <a href="/side-projects" data-hoverable="true">Side projects</a>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="bottom-left">
          <a href="https://www.linkedin.com/in/oluwafemi-joshua/" target="_blank" rel="noreferrer" data-hoverable="true" className="bottom-link">
            <span className="bottom-link-icon"><LinkedInIcon /></span>
            <span>LinkedIn</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="https://github.com/jarvis-create" target="_blank" rel="noreferrer" data-hoverable="true" className="bottom-link">
            <span className="bottom-link-icon"><GitHubIcon /></span>
            <span>GitHub</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="/shelf" data-hoverable="true" className="bottom-link bottom-link--library">
            <span className="bottom-link-icon"><LibraryIcon /></span>
            <span>Library</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="bottom-right">
          <p>5 years building products</p>
          <p>that solve human problems</p>
        </div>
      </div>
    </main>
  );
}

function WorkPage() {
  const navRef = useRef<HTMLElement>(null);

  // Scroll-reveal for chapters, dividers, and closer
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const els = document.querySelectorAll(".ch, .divider, .closer");
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Active sidebar nav link based on scroll position
  useEffect(() => {
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navRef.current
              ?.querySelectorAll(".rn")
              .forEach((n) =>
                n.classList.toggle(
                  "active",
                  (n as HTMLElement).dataset.s === e.target.id
                )
              );
          }
        });
      },
      { threshold: 0.4 }
    );
    const sections = document.querySelectorAll(".ch[id]");
    sections.forEach((el) => sio.observe(el));
    return () => sio.disconnect();
  }, []);

  const scrollTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <aside className="rail" ref={navRef}>
        <div>
          <p className="rail-eyebrow">Oluwafemi Joshua</p>
          <h1 className="rail-title">
            How I<br /><em>work.</em>
          </h1>
        </div>
        <nav className="rail-nav" aria-label="Work section navigation">
          <a className="rn" href="#origin" data-s="origin" onClick={scrollTo("origin")}>
            <span className="rn-num">01</span>Origin
          </a>
          <a className="rn" href="#approach" data-s="approach" onClick={scrollTo("approach")}>
            <span className="rn-num">02</span>Approach
          </a>
          <a className="rn" href="#philosophy" data-s="philosophy" onClick={scrollTo("philosophy")}>
            <span className="rn-num">03</span>Philosophy
          </a>
          <a className="rn" href="#ai" data-s="ai" onClick={scrollTo("ai")}>
            <span className="rn-num">04</span>On AI
          </a>
          <a className="rn" href="#selected-work" data-s="selected-work" onClick={scrollTo("selected-work")}>
            <span className="rn-num">05</span>Selected Work
          </a>
        </nav>
        <div>
          <a className="nav-back" href="/">← Home</a>
          <a className="rail-cta" href="https://calendly.com/joshuaojo/15min" target="_blank" rel="noreferrer">
            Start a conversation <span aria-hidden="true">→</span>
          </a>
        </div>
      </aside>

      <main className="content">
        <div className="essay">

          {/* 01 Origin */}
          <div className="ch" id="origin">
            <p className="ch-tag">01 Origin</p>
            <h2 className="ch-h">I think in systems.<br />I always <em>have.</em></h2>
            <p>
              I trained as a Chemical Engineer because I wanted to work in oil. I did, for some of the biggest companies in the industry. It wasn't for me. But what I took from it was how to think from first principles. How to create value from raw, messy inputs. How small variables change everything downstream. How the failure of one component quietly breaks the whole.
            </p>
            <p>
              That's still how I think. I came into product through the unglamorous side: requirements gathering, QA, enterprise transformation work where the client doesn't tell you the real problem until week three. I learned to wait for it.
            </p>
            <p className="aside">The unglamorous side turns out to be where all the real learning is.</p>
          </div>

          <div className="divider"></div>

          {/* 02 Approach */}
          <div className="ch" id="approach">
            <p className="ch-tag">02 Approach</p>
            <h2 className="ch-h">Discovery before<br />momentum. <em>Always.</em></h2>
            <p>
              Most teams don't fail because they move too slowly. They fail because they build confidence around the wrong problem. I've learned to spend more time where uncertainty is highest, not to delay shipping, but to make later decisions cheaper, clearer, and easier to defend.
            </p>
            <p>
              My default is to create structure early: better questions, sharper hypotheses, prototypes that are honest about what they're testing, and enough clarity to know what success should look like before a team starts optimizing for speed.
            </p>
            <p className="pull">The question nobody asked is usually the one that unlocks everything.</p>
            <p>
              AI is compressing this in useful ways. I'm using it to run more experiments in the problem space faster, stress-test assumptions that used to take weeks, and surface edge cases earlier. The discipline stays the same. The velocity is new. Discovery still comes first, but now the window between hypothesis and evidence is shorter.
            </p>
          </div>

          <div className="divider"></div>

          {/* 03 Philosophy */}
          <div className="ch" id="philosophy">
            <p className="ch-tag">03 Philosophy</p>
            <h2 className="ch-h">What I actually<br /><em>believe.</em></h2>
            <p>Not values from a workshop. Things I've been wrong about, then right about, enough times that I just hold them now.</p>
            <div className="principles">
              <div className="principle">
                <span className="p-n">01</span>
                <p className="p-t"><strong>The product is never the point.</strong> The human problem is. Every feature, every sprint - if I can't trace it back to a real human pain, I get suspicious.</p>
              </div>
              <div className="principle">
                <span className="p-n">02</span>
                <p className="p-t"><strong>Good questions age better than good answers.</strong> Frameworks change. The right question does work for years.</p>
              </div>
              <div className="principle">
                <span className="p-n">03</span>
                <p className="p-t"><strong>Slow down to ship faster.</strong> The rushed decision that skips discovery always costs more downstream.</p>
              </div>
              <div className="principle">
                <span className="p-n">04</span>
                <p className="p-t"><strong>Conviction is not certainty.</strong> I'll commit fully to a direction while staying genuinely open to being wrong.</p>
              </div>
              <div className="principle">
                <span className="p-n">05</span>
                <p className="p-t"><strong>The metric proves it worked. The human proves it mattered.</strong> I track both.</p>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* 04 On AI */}
          <div className="ch" id="ai">
            <p className="ch-tag">04 On AI</p>
            <h2 className="ch-h">A collaborator.<br />Not a <em>shortcut.</em></h2>
            <p>
              I've spent the better part of the last two years building AI-native products and evaluation frameworks. That changes how you think about what "done" means. With LLMs, done isn't a state, it's a dial.
            </p>
            <div className="inset">
              <p className="inset-tag">What I built at Tech1M</p>
              <p>
                Evaluation and guardrails framework for LLM features: <strong>content relevance, groundedness scoring, PII safeguards, rubric-based output evaluation.</strong> Goal was stabilising quality before GA, not patching after.
              </p>
            </div>
            <p>
              The teams getting the most from AI understand their problem space deeply enough to evaluate the output. You can't prompt your way out of not knowing what you're solving for.
            </p>
            <p>
              I'm also thinking about what AI does to the humans using the products. That's the question I don't think enough PMs are asking.
            </p>
          </div>

          <div className="divider"></div>

          {/* 05 Selected Work */}
          <div className="ch" id="selected-work">
            <p className="ch-tag">05 Selected Work</p>
            <h2 className="ch-h">Work that<br /><em>held up.</em></h2>
            <div className="work-grid">
              <article className="work-card">
                <div className="work-card-top">
                  <span className="work-card-n">01</span>
                  <span className="work-card-tag">AI quality systems</span>
                </div>
                <h3 className="work-card-h">LLM evaluation and guardrails</h3>
                <p className="work-card-copy">Built evaluation frameworks for AI-powered product experiences, including groundedness, relevance, and safety checks, to make output quality measurable before broader rollout.</p>
              </article>
              <article className="work-card">
                <div className="work-card-top">
                  <span className="work-card-n">02</span>
                  <span className="work-card-tag">Enterprise transformation</span>
                </div>
                <h3 className="work-card-h">Enterprise rollout at scale</h3>
                <p className="work-card-copy">Led work on a large enterprise transformation affecting 50,000+ partners, with 99.9% uptime post-launch and 75% adoption within three months.</p>
              </article>
              <article className="work-card">
                <div className="work-card-top">
                  <span className="work-card-n">03</span>
                  <span className="work-card-tag">Payments infrastructure</span>
                </div>
                <h3 className="work-card-h">Payments reliability across markets</h3>
                <p className="work-card-copy">Worked on payment systems spanning 60+ countries, shaping validation logic and edge-case handling in flows where downstream failures were expensive.</p>
              </article>
              <article className="work-card">
                <div className="work-card-top">
                  <span className="work-card-n">04</span>
                  <span className="work-card-tag">Regulated operations</span>
                </div>
                <h3 className="work-card-h">Regulated workflow design</h3>
                <p className="work-card-copy">Redesigned onboarding and operational flows in environments where ambiguity created compliance and execution risk.</p>
              </article>
            </div>
            <div className="work-reflection">
              <p className="work-reflection-kicker">What matters to me</p>
              <p>
                I care less about flashy metrics than whether the work held up under real constraints. The projects I'm proudest of are the ones where quality became clearer, risk got reduced earlier, and teams could move with more confidence because the system made more sense.
              </p>
            </div>
          </div>

          {/* Closer */}
          <div className="closer">
            <h2 className="closer-h">If this sounds like<br />someone you want<br />in the <em>room.</em></h2>
            <p className="closer-note">I'm easy to reach and enjoy a good conversation about hard problems. No pitch needed.</p>
            <div className="contact-list">
              <a href="mailto:joshuaojo33@gmail.com" className="contact-item" data-hoverable="true">
                <span className="ci-label">Email</span>
                <span className="ci-value">joshuaojo33@gmail.com</span>
                <span className="ci-arrow">→</span>
              </a>
              <a href="https://www.linkedin.com/in/oluwafemi-joshua/" target="_blank" rel="noreferrer" className="contact-item" data-hoverable="true">
                <span className="ci-label">LinkedIn</span>
                <span className="ci-value">Let's connect</span>
                <span className="ci-arrow">→</span>
              </a>
              <a href="https://medium.com/@oluwafemi-joshua" target="_blank" rel="noreferrer" className="contact-item" data-hoverable="true">
                <span className="ci-label">Medium</span>
                <span className="ci-value">Read my writing</span>
                <span className="ci-arrow">→</span>
              </a>
              <a href="https://oluwafemijoshua.substack.com" target="_blank" rel="noreferrer" className="contact-item" data-hoverable="true">
                <span className="ci-label">Substack</span>
                <span className="ci-value">Subscribe</span>
                <span className="ci-arrow">→</span>
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="about-split">
        <aside className="about-left">
          <a href="/" className="nav-back" data-hoverable="true">← Back</a>
          <div className="about-metrics">
            <div className="about-metric"><span className="m-num">5</span><span className="m-text">Years building products in early-stage & growth environments</span></div>
            <div className="about-metric"><span className="m-num">35%</span><span className="m-text">Free → paid conversion on 2.3k signups, H1 2024</span></div>
            <div className="about-metric"><span className="m-num">$120k</span><span className="m-text">Pilot revenue closed in under 6 months at Tech1M</span></div>
            <div className="about-metric"><span className="m-num">50k+</span><span className="m-text">Users on enterprise rollout. 95% CSAT. 75% adoption in 3 months.</span></div>
          </div>
          <div className="about-left-bottom">
            <span className="about-dot" aria-hidden="true"></span>
            <a href="https://calendly.com/joshuaojo/15min" target="_blank" rel="noreferrer" className="about-cta" data-hoverable="true">Start a conversation →</a>
          </div>
        </aside>

        <main className="about-right">
          <div className="about-content">
            <div className="about-photo-wrap">
              <img src="/oluwafemi-joshua.png" alt="Oluwafemi Joshua" className="about-photo" width={1182} height={736} loading="lazy" decoding="async" />
            </div>
            <p className="about-label">Working with me</p>
            <h1 className="about-title">The PM who makes<br />the team ask<br /><em>better questions.</em></h1>
            <p className="about-copy">I trained as a Chemical Engineer. I came into product through the unglamorous side: requirements gathering, QA, enterprise transformation where the real problem doesn't surface until week three. I like it there.</p>
            <p className="about-copy">What I bring doesn't fit a job description. I'll sit with a problem until I find the question nobody else asked. I default to <em>discovery before solution</em>. And I care, genuinely, about the humans behind the metrics.</p>
            <p className="about-copy">Currently at Tech1M running product strategy end to end. AI-native products, PLG, and the unglamorous work of making things actually stick.</p>
          </div>
          <div className="about-watermark">OJ</div>
        </main>
      </section>
    </>
  );
}

function WritingPage() {
  return (
    <div className="writing-page">
      {/* Header */}
      <header className="wp-header">
        <div>
          <p className="wp-eyebrow">Writing</p>
          <h1 className="wp-title">I write when something<br />bothers me <em>enough.</em></h1>
        </div>
        <a href="/" className="nav-back">← Back</a>
      </header>

      {/* Body - Two columns */}
      <div className="wp-body">
        {/* Medium column */}
        <div className="wp-pub">
          <div className="wp-pub-header">
            <div className="wp-pub-logo medium"><span>M</span></div>
            <div className="wp-pub-meta">
              <span className="wp-pub-name">Medium</span>
              <span className="wp-pub-desc">Product, AI, the work</span>
            </div>
            <a href="https://medium.com/@oluwafemi-joshua" target="_blank" rel="noreferrer" className="wp-pub-cta">Read all →</a>
          </div>
          <div className="wp-articles">
            <a href="https://medium.com/@oluwafemi-joshua/principle-zero-evals-are-all-you-need-d57d989d693e" target="_blank" rel="noreferrer" className="wp-article">
              <p className="wa-date">Oct 2025</p>
              <h2 className="wa-title">Practical Notes on setting up AI Evals for your business</h2>
              <p className="wa-excerpt">The best evals come from teams who've done the hard work of truly understanding their problem space</p>
            </a>
            <a href="https://medium.com/@oluwafemi-joshua/i2p-probing-the-need-for-a-better-digital-life-archive-part-1-6c3cd941db90" target="_blank" rel="noreferrer" className="wp-article">
              <p className="wa-date">Oct 2025</p>
              <h2 className="wa-title">Probing The Need for a Better Digital Life Archive</h2>
              <p className="wa-excerpt">For some time now, I have been oddly fascinated with death and how it interacts with the lives we live</p>
            </a>
            <div className="wp-article placeholder">
              <p className="wa-date">- -</p>
              <h2 className="wa-title">More coming</h2>
              <p className="wa-excerpt">Writing in bursts. More when something bothers me enough to say it.</p>
            </div>
          </div>
        </div>

        {/* Substack column */}
        <div className="wp-pub">
          <div className="wp-pub-header">
            <div className="wp-pub-logo substack"><span>S</span></div>
            <div className="wp-pub-meta">
              <span className="wp-pub-name">Substack</span>
              <span className="wp-pub-desc">Faith, humans, the condition</span>
            </div>
            <a href="https://oluwafemijoshua.substack.com" target="_blank" rel="noreferrer" className="wp-pub-cta">Subscribe →</a>
          </div>
          <div className="wp-articles">
            <a href="https://open.substack.com/pub/oluwafemijoshua/p/dont-stop-drowning?utm_campaign=post-expanded-share&utm_medium=web" target="_blank" rel="noreferrer" className="wp-article">
              <p className="wa-date">Jun 2025</p>
              <h2 className="wa-title">Don't Drown</h2>
              <p className="wa-excerpt">At first thought, it feels like it should be natural to self, that we should want love for ourselves and seek it like the blood-crazed sharks I'm starting to think we are</p>
            </a>
            <div className="wp-article placeholder">
              <p className="wa-date">- -</p>
              <h2 className="wa-title">More coming</h2>
              <p className="wa-excerpt">This one gets personal. Subscribe if you want to be in the room while I'm still figuring it out.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="wp-footer">
        <span className="wp-footer-note">I write more than I publish. Working on that.</span>
        <div className="wp-footer-tags">
          <span className="wp-footer-tag">Digital Manuscripts</span>
          <span className="wp-footer-tag">Thought Fragments</span>
          <span className="wp-footer-tag">Encoded Wisdom</span>
          <a href="https://calendly.com/joshuaojo/15min" target="_blank" rel="noreferrer" className="wp-footer-tag wp-footer-cta">Start a conversation →</a>
        </div>
      </footer>
    </div>
  );
}

function SideProjectsPage() {
  return (
    <section className="sp-page">
      <header className="sp-header">
        <div>
          <p className="sp-eyebrow">Side Projects</p>
          <h1 className="sp-title">Things I build when<br />nobody's <em>paying me.</em></h1>
        </div>
        <a href="/" className="nav-back nav-back--light">← Back</a>
      </header>

      <div className="sp-grid">
        <article className="sp-card sp-card--live">
          <p className="sp-status"><span className="sp-status-dash">-</span> Live now</p>
          <h2 className="sp-name">Useiterance</h2>
          <p className="sp-desc">Useiterance is not a notes app, a passive read-later list, or a bookmarking tool. It's a reinforcement platform, a retention engine, and a learning system for the things you actually want to know.</p>
          <a href="https://app.useiterance.com" target="_blank" rel="noreferrer" className="sp-card-cta">Try now <span aria-hidden="true">↗</span></a>
          <span className="sp-ghost">01</span>
          <div className="sp-tags"><span>AI/ML</span><span>RAG</span><span>B2C</span></div>
        </article>

        <article className="sp-card">
          <p className="sp-status"><span className="sp-status-dash">-</span> Coming soon</p>
          <h2 className="sp-name">Student Helper</h2>
          <p className="sp-desc">Personalised study assistant for early learners. Less tutoring app, more thinking partner. Designed so that it makes students sharper, not dependent.</p>
          <span className="sp-ghost">02</span>
          <div className="sp-tags"><span>B2C</span><span>SaaS</span><span>Edtech</span></div>
        </article>

        <article className="sp-card">
          <p className="sp-status"><span className="sp-status-dash">-</span> Exploring</p>
          <h2 className="sp-name">Death Note</h2>
          <p className="sp-desc">Experimental heirloom system for digital legacies. The question nobody's answered properly: what happens to who you were online when you're gone?</p>
          <span className="sp-ghost">03</span>
          <div className="sp-tags"><span>Research</span></div>
        </article>
      </div>

      <footer className="sp-footer">
        <p className="sp-footer-text">All three are live questions I can't stop thinking about, not just roadmap items. Ask me about any of them.</p>
        <a href="https://calendly.com/joshuaojo/15min" target="_blank" rel="noreferrer" className="sp-footer-cta">Start a conversation →</a>
        <span className="sp-footer-dot"></span>
      </footer>
    </section>
  );
}

function ShelfPage() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <nav className="top-nav" aria-label="Site navigation">
        <span className="nav-name">Oluwafemi Joshua</span>
        <ul className="nav-links">
          <li><a href="/" data-hoverable="true">Home</a></li>
          <li><a href="/work" data-hoverable="true">How I work</a></li>
          <li><a href="/about" data-hoverable="true">Working with me</a></li>
          <li><a href="/side-projects" data-hoverable="true">Side projects</a></li>
          <li><a href="/shelf" data-hoverable="true" style={{ opacity: 0.8 }}>Shelf</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="sh-hero">
        <div className="sh-hero-bg-text" aria-hidden="true">Reading &amp; Listening</div>
        <a className="nav-back nav-back--light sh-back" href="/" data-hoverable="true">← Back</a>
        <div className="sh-hero-eyebrow">002 / Shelf</div>
        <h1 className="sh-hero-title">Reading &amp;<br /><em>Listening.</em></h1>
        <p className="sh-hero-desc">Directory of books I've enjoyed so far and music that I think otherworldly</p>
        <div className="sh-hero-scroll" aria-hidden="true">Scroll</div>
      </section>

      <div className="sh-divider" />

      {/* ── READING ── */}
      <div className="sh-section">
        <div className="sh-section-header">
          <span className="sh-section-number">01</span>
          <h2 className="sh-section-label">Reading</h2>
        </div>

        <p className="sh-sublabel">Currently on the nightstand</p>
        <a href="https://www.goodreads.com/book/show/43263178-demon-in-white" target="_blank" rel="noreferrer" className="sh-featured" data-hoverable="true">
          <div className="sh-featured-ghost" aria-hidden="true">Demon</div>
          <div>
            <span className="sh-featured-tag">Reading Now</span>
            <h3 className="sh-featured-title">Demon in White</h3>
            <p className="sh-featured-author">Christopher Ruocchio <span>Sun Eater #3</span></p>
          </div>
          <div className="sh-progress-wrap">
            <span className="sh-progress-label">In progress</span>
            <div className="sh-progress-bar"><div className="sh-progress-fill" /></div>
          </div>
        </a>

        <p className="sh-sublabel">Books that stayed with me</p>
        <div>
          <a href="https://www.goodreads.com/book/show/22822858-a-little-life" target="_blank" rel="noreferrer" className="sh-book" data-hoverable="true">
            <span className="sh-book-num">i</span>
            <div>
              <div className="sh-book-title">A Little Life</div>
              <div className="sh-book-author">Hanya Yanagihara</div>
            </div>
            <span className="sh-book-arr">→</span>
          </a>
          <a href="https://www.goodreads.com/book/show/33385229-they-both-die-at-the-end" target="_blank" rel="noreferrer" className="sh-book" data-hoverable="true">
            <span className="sh-book-num">ii</span>
            <div>
              <div className="sh-book-title">They Both Die at the End</div>
              <div className="sh-book-author">Adam Silvera</div>
            </div>
            <span className="sh-book-arr">→</span>
          </a>
          <a href="https://www.goodreads.com/book/show/35052907-empire-of-silence" target="_blank" rel="noreferrer" className="sh-book" data-hoverable="true">
            <span className="sh-book-num">iii</span>
            <div>
              <div className="sh-book-title">Empire of Silence</div>
              <div className="sh-book-author">Christopher Ruocchio <span className="sh-book-series">Sun Eater #1</span></div>
            </div>
            <span className="sh-book-arr">→</span>
          </a>
          <a href="https://www.goodreads.com/book/show/39927451-howling-dark" target="_blank" rel="noreferrer" className="sh-book" data-hoverable="true">
            <span className="sh-book-num">iv</span>
            <div>
              <div className="sh-book-title">Howling Dark</div>
              <div className="sh-book-author">Christopher Ruocchio <span className="sh-book-series">Sun Eater #2</span></div>
            </div>
            <span className="sh-book-arr">→</span>
          </a>
        </div>
      </div>

      <div className="sh-divider" />

      {/* ── LISTENING ── */}
      <div className="sh-section">
        <div className="sh-section-header">
          <span className="sh-section-number">02</span>
          <h2 className="sh-section-label">Listening</h2>
        </div>

        <p className="sh-sublabel" style={{ marginBottom: 30 }}>On repeat</p>
        <div className="sh-music-grid">
          <div className="sh-music-item"><span className="sh-music-name">God Is an Astronaut</span><span className="sh-music-tag">Post-Rock</span></div>
          <div className="sh-music-item"><span className="sh-music-name">Daughter</span><span className="sh-music-tag">Indie / Alt</span></div>
          <div className="sh-music-item sh-music-item--last"><span className="sh-music-name">Mogwai</span><span className="sh-music-tag">Post-Rock</span></div>
        </div>

        <a
          href="https://music.youtube.com/playlist?list=RDATjuUCTZ0jrJMAcBV7FmSBXwWsaw&playnext=1&si=GFutgQXkrggJBm38"
          target="_blank"
          rel="noreferrer"
          className="sh-playlist"
          data-hoverable="true"
        >
          <div className="sh-play-btn" aria-hidden="true">&#9654;</div>
          <div>
            <div className="sh-pl-meta">The Mix</div>
            <div className="sh-pl-title">Live Playlist</div>
            <div className="sh-pl-desc">A running mix of everything I'm listening to. Post-rock, ambient, the kind of music that makes you stare out of windows.</div>
          </div>
          <span className="sh-pl-arr">→</span>
        </a>
      </div>

      <footer>
        <p>© {currentYear} · Oluwafemi Joshua</p>
        <a href="https://calendly.com/joshuaojo/15min" target="_blank" rel="noreferrer" data-hoverable="true">Start a conversation →</a>
      </footer>
    </>
  );
}
