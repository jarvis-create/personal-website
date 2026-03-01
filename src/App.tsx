import { useCallback, useEffect, useRef, useState } from "react";
import "./styles/editorial.css";

/**
 * Femi Ojo personal site prototype
 * - Home (single screen intro)
 * - Work (essay layout)
 * - Why work with me
 * - Shelf (placeholder)
 */
export default function Prototype() {
  const [route, setRoute] = useState<"home" | "work" | "writing" | "about" | "side-projects" | "shelf">("home");

  useEffect(() => {
    const parse = () => {
      const h = (window.location.hash || "#/home").toLowerCase();
      if (h.startsWith("#/work")) {
        setRoute("work");
      } else if (h.startsWith("#/shelf")) {
        setRoute("shelf");
      } else if (h.startsWith("#/about")) {
        setRoute("about");
      } else if (h.startsWith("#/side-projects")) {
        setRoute("side-projects");
      } else if (h.startsWith("#/writing")) {
        setRoute("writing");
      } else {
        setRoute("home");
      }
    };
    parse();
    window.addEventListener("hashchange", parse);
    return () => window.removeEventListener("hashchange", parse);
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
    <div className="site">

      {route === "home" && <Home />}
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

function useTypedLine(lines: string[]) {
  const ref = useRef<HTMLSpanElement>(null);

  const type = useCallback(
    (text: string): Promise<void> =>
      new Promise((resolve) => {
        let i = 0;
        const id = setInterval(() => {
          if (!ref.current) { clearInterval(id); return; }
          ref.current.textContent += text[i++];
          if (i >= text.length) { clearInterval(id); resolve(); }
        }, 30);
      }),
    []
  );

  const erase = useCallback(
    (): Promise<void> =>
      new Promise((resolve) => {
        const id = setInterval(() => {
          if (!ref.current) { clearInterval(id); return; }
          ref.current.textContent = ref.current.textContent!.slice(0, -1);
          if (!ref.current.textContent!.length) { clearInterval(id); resolve(); }
        }, 18);
      }),
    []
  );

  useEffect(() => {
    let cancelled = false;

    // Respect prefers-reduced-motion: show first line statically
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = lines[0];
      return;
    }

    async function cycle() {
      let idx = 0;
      // Initial pause before typing starts
      await delay(1600);
      while (!cancelled) {
        await type(lines[idx]);
        await delay(3200); // pause to read
        await erase();
        await delay(400); // brief gap between lines
        idx = (idx + 1) % lines.length;
      }
    }

    function delay(ms: number) {
      return new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        // If cancelled during a delay, we still resolve (the while-loop
        // condition catches it on the next iteration).
        void id;
      });
    }

    cycle();
    return () => { cancelled = true; };
  }, [lines, type, erase]);

  return ref;
}

function Home() {
  const typedRef = useTypedLine(TYPED_LINES);

  return (
    <div className="page">
      <div className="v-rule"></div>

      <div className="status-block">
        <p><span className="status-dot"></span>Available for new work</p>
        <p>Technical PM · Part-time writer</p>
      </div>

      <div className="centre">
        <p className="centre-kicker" style={{ fontWeight: 500 }}>
          <img src="/favicon.ico" alt="" className="kicker-avatar" aria-hidden="true" />
          Hi, I'm Oluwafemi Joshua
        </p>
        <h1 className="centre-headline">
          I build products<br />that become<br /><em>habits.</em>
        </h1>
        <p className="centre-roleline">Technical Product Manager & <span>Writer</span></p>
        <p className="centre-question">
          <span ref={typedRef}></span>
          <span className="typed-cursor" aria-hidden="true"></span>
        </p>
        <div className="centre-nav">
          <a href="#/work" data-hoverable="true">How I work</a>
          <a href="#/writing" data-hoverable="true">Writing</a>
          <a href="#/about" data-hoverable="true">Working with me</a>
          <a href="#/side-projects" data-hoverable="true">Side projects</a>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="bottom-left">
          <a href="https://www.linkedin.com/in/oluwafemi-joshua/" target="_blank" rel="noreferrer" data-hoverable="true">LinkedIn →</a>
          <a href="https://github.com/jarvis-create" target="_blank" rel="noreferrer" data-hoverable="true">GitHub →</a>
          <a href="#/shelf" data-hoverable="true" style={{ marginTop: '4px' }}>Shelf →</a>
        </div>
        <div className="bottom-right">
          <p>5 years building products</p>
          <p>that solve human problems</p>
        </div>
      </div>
    </div>
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

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
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
        <nav className="rail-nav">
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
          <a className="rn" href="#evidence" data-s="evidence" onClick={scrollTo("evidence")}>
            <span className="rn-num">05</span>Evidence
          </a>
        </nav>
        <div>
          <a className="rail-back" href="#/home">← Home</a>
          <a className="rail-cta" href="mailto:joshuaojo33@gmail.com">
            Start a conversation <span aria-hidden="true">→</span>
          </a>
        </div>
      </aside>

      <div className="content">
        <div className="essay">

          {/* 01 — Origin */}
          <div className="ch" id="origin">
            <p className="ch-tag">01 — Origin</p>
            <h2 className="ch-h">I think in systems.<br />I always <em>have.</em></h2>
            <p>
              I trained as a Chemical Engineer. Not because I wanted to work in oil — because I wanted to understand how things <em>work</em>. How inputs become outputs. How small variables change everything downstream. How the failure of one component quietly breaks the whole.
            </p>
            <p>
              That's still how I think. I came into product through the unglamorous side: requirements gathering, QA, enterprise transformation work where the client doesn't tell you the real problem until week three. I learned to wait for it.
            </p>
            <p className="aside">The unglamorous side turns out to be where all the real learning is.</p>
          </div>

          <div className="divider"></div>

          {/* 02 — Approach */}
          <div className="ch" id="approach">
            <p className="ch-tag">02 — Approach</p>
            <h2 className="ch-h">Discovery before<br />solution. <em>Always.</em></h2>
            <p>
              Most teams ship the wrong thing faster than the right thing. They optimise for velocity before they've earned the right to move fast. I've seen what happens: six months of sprint velocity and then a pivot because nobody stopped to ask whether the problem was real.
            </p>
            <p>
              My default is to slow down at the beginning so I can move fast later. I'll spend twice as long in the problem space if it means I ship something that doesn't need to be thrown away.
            </p>
            <p className="pull">The question nobody asked is usually the one that unlocks everything.</p>
            <p>
              In practice: discovery sessions that feel like conversations. Prototypes honest about what they're testing. Hypotheses written before sprint planning, not after. And the willingness to say "we don't know enough yet" in a room full of people who want to ship.
            </p>
          </div>

          <div className="divider"></div>

          {/* 03 — Philosophy */}
          <div className="ch" id="philosophy">
            <p className="ch-tag">03 — Philosophy</p>
            <h2 className="ch-h">What I actually<br /><em>believe.</em></h2>
            <p>Not values from a workshop. Things I've been wrong about, then right about, enough times that I just hold them now.</p>
            <div className="principles">
              <div className="principle">
                <span className="p-n">01</span>
                <p className="p-t"><strong>The product is never the point.</strong> The human problem is. Every feature, every sprint — if I can't trace it back to a real human pain, I get suspicious.</p>
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

          {/* 04 — On AI */}
          <div className="ch" id="ai">
            <p className="ch-tag">04 — On AI</p>
            <h2 className="ch-h">A collaborator.<br />Not a <em>shortcut.</em></h2>
            <p>
              I've spent the better part of the last two years building AI-native products and evaluation frameworks. That changes how you think about what "done" means — with LLMs, done isn't a state, it's a dial.
            </p>
            <div className="inset">
              <p className="inset-tag">What I built at Tech1M</p>
              <p>
                Evaluation and guardrails framework for LLM features — <strong>content relevance, groundedness scoring, PII safeguards, rubric-based output evaluation.</strong> Goal was stabilising quality before GA, not patching after.
              </p>
            </div>
            <p>
              The teams getting the most from AI understand their problem space deeply enough to evaluate the output. You can't prompt your way out of not knowing what you're solving for.
            </p>
            <p>
              I'm also thinking about what AI does to the humans using the products. That's the question I don't think enough PMs are asking. I'm asking it.
            </p>
          </div>

          <div className="divider"></div>

          {/* 05 — Evidence */}
          <div className="ch" id="evidence">
            <p className="ch-tag">05 — Evidence</p>
            <h2 className="ch-h">What the work<br />actually <em>produced.</em></h2>
            <p>Numbers are honest. They're also not the whole story — ask me about the experiments that failed.</p>
            <div className="stats">
              <div>
                <span className="stat-n">35%</span>
                <span className="stat-l">Free → paid conversion<br />2.3k signups, H1 2024</span>
              </div>
              <div>
                <span className="stat-n">$120k</span>
                <span className="stat-l">Pilot revenue<br />under 6 months</span>
              </div>
              <div>
                <span className="stat-n">50k+</span>
                <span className="stat-l">Users on enterprise<br />rollout at Tedbree</span>
              </div>
              <div>
                <span className="stat-n">95%</span>
                <span className="stat-l">CSAT through full<br />enterprise deployment</span>
              </div>
            </div>
            <p>
              Led a full enterprise transformation at Tedbree serving 50,000+ partners as the sole technical analyst. Kept 99.9% uptime post-launch and 75% user adoption within three months.
            </p>
            <p className="aside">The adoption number is the one I'm most proud of. Getting 75% of 50,000 people to actually change how they work in 90 days — that's a product and people problem solved together.</p>
          </div>

          {/* Closer */}
          <div className="closer">
            <h2 className="closer-h">If this sounds like<br />someone you want<br />in the <em>room —</em></h2>
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
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="about-split">
        <aside className="about-left">
          <a href="#/home" className="about-close" data-hoverable="true">← Close</a>
          <div className="about-metrics">
            <div className="about-metric"><span className="m-num">5</span><span className="m-text">Years building products in early-stage & growth environments</span></div>
            <div className="about-metric"><span className="m-num">35%</span><span className="m-text">Free → paid conversion on 2.3k signups, H1 2024</span></div>
            <div className="about-metric"><span className="m-num">$120k</span><span className="m-text">Pilot revenue closed in under 6 months at Tech1M</span></div>
            <div className="about-metric"><span className="m-num">50k+</span><span className="m-text">Users on enterprise rollout. 95% CSAT. 75% adoption in 3 months.</span></div>
          </div>
          <div className="about-left-bottom">
            <span className="about-dot" aria-hidden="true"></span>
            <a href="mailto:joshuaojo33@gmail.com" className="about-cta" data-hoverable="true">Start a conversation →</a>
          </div>
        </aside>

        <main className="about-right">
          <div className="about-content">
            <div className="about-photo-wrap">
              <img src="/oluwafemi-joshua.png" alt="Oluwafemi Joshua" className="about-photo" />
            </div>
            <p className="about-label">Working with me</p>
            <h1 className="about-title">The person who asks<br />the question <em>nobody asked.</em></h1>
            <p className="about-copy">I trained as a Chemical Engineer. I came into product through the unglamorous side — requirements gathering, QA, enterprise transformation where the real problem doesn't surface until week three. I like it there.</p>
            <p className="about-copy">What I bring that doesn't fit a job description: I'll sit with a problem until I find the question nobody else asked. I default to <em>discovery before solution</em>. And I care — genuinely — about the humans behind the metrics.</p>
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
        <a href="#/home" className="wp-back">← Back</a>
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
              <p className="wa-title">Practical Notes on setting up AI Evals for your business</p>
              <p className="wa-excerpt">The best evals come from teams who've done the hard work of truly understanding their problem space</p>
            </a>
            <a href="https://medium.com/@oluwafemi-joshua/i2p-probing-the-need-for-a-better-digital-life-archive-part-1-6c3cd941db90" target="_blank" rel="noreferrer" className="wp-article">
              <p className="wa-date">Oct 2025</p>
              <p className="wa-title">Probing The Need for a Better Digital Life Archive</p>
              <p className="wa-excerpt">For some time now, I have been oddly fascinated with death and how it interacts with the lives we live</p>
            </a>
            <div className="wp-article placeholder">
              <p className="wa-date">— —</p>
              <p className="wa-title">More coming</p>
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
              <p className="wa-title">Don't Drown</p>
              <p className="wa-excerpt">At first thought, it feels like it should be natural to self — that we should want love for ourselves and seek it like the blood-crazed sharks I'm starting to think we are</p>
            </a>
            <div className="wp-article placeholder">
              <p className="wa-date">— —</p>
              <p className="wa-title">More coming</p>
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
        <a href="#/home" className="sp-close">← Close</a>
      </header>

      <div className="sp-grid">
        <article className="sp-card">
          <p className="sp-status"><span className="sp-status-dash">—</span> Coming soon</p>
          <h2 className="sp-name">Iterance</h2>
          <p className="sp-desc">AI-enabled personal knowledge management. Your second brain — actually useful. Built on the idea that most notes apps are just graveyards.</p>
          <span className="sp-ghost">01</span>
          <div className="sp-tags"><span>AI/ML</span><span>RAG</span><span>B2C</span></div>
        </article>

        <article className="sp-card">
          <p className="sp-status"><span className="sp-status-dash">—</span> Coming soon</p>
          <h2 className="sp-name">Student Helper</h2>
          <p className="sp-desc">Personalised study assistant for early learners. Less tutoring app, more thinking partner. Designed so that it makes students sharper, not dependent.</p>
          <span className="sp-ghost">02</span>
          <div className="sp-tags"><span>B2C</span><span>SaaS</span><span>Edtech</span></div>
        </article>

        <article className="sp-card">
          <p className="sp-status"><span className="sp-status-dash">—</span> Exploring</p>
          <h2 className="sp-name">Death Note</h2>
          <p className="sp-desc">Experimental heirloom system for digital legacies. The question nobody's answered properly: what happens to who you were online when you're gone?</p>
          <span className="sp-ghost">03</span>
          <div className="sp-tags"><span>Research</span></div>
        </article>
      </div>

      <footer className="sp-footer">
        <p className="sp-footer-text">All three are live questions I can't stop thinking about — not just roadmap items. Ask me about any of them.</p>
        <span className="sp-footer-dot"></span>
      </footer>
    </section>
  );
}

function ShelfPage() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <nav className="top-nav">
        <span className="nav-name">Oluwafemi Joshua</span>
        <ul className="nav-links">
          <li><a href="#/home" data-hoverable="true">Home</a></li>
          <li><a href="#/work" data-hoverable="true">How I work</a></li>
          <li><a href="#/about" data-hoverable="true">Working with me</a></li>
          <li><a href="#/side-projects" data-hoverable="true">Side projects</a></li>
          <li><a href="#/shelf" data-hoverable="true" style={{ opacity: 0.8 }}>Shelf</a></li>
        </ul>
      </nav>

      <div className="wrap page-hero" style={{ padding: "180px 48px 120px", maxWidth: "680px", margin: "0 auto", minHeight: "80vh" }}>
        <a className="back" href="#/home" data-hoverable="true" style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.15em", color: "var(--ink-faint)", textTransform: "uppercase", textDecoration: "none" }}>
          ← Back
        </a>
        <div style={{ height: 18 }} />
        <div className="label" style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "var(--accent-muted)", textTransform: "uppercase", marginBottom: "16px" }}>002 / Shelf</div>
        <h1 className="title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 400, lineHeight: 1.12, margin: "0 0 24px", color: "var(--ink)" }}>
          Reading & Listening
        </h1>
        <p className="lede" style={{ fontSize: "18px", lineHeight: 1.9, color: "var(--ink-soft)" }}>
          A digital garden of things that influence my thinking. Under construction.
        </p>
      </div>

      <footer style={{ padding: "28px 48px", borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "var(--ink-faint)", textTransform: "uppercase" }}>© {currentYear} · Oluwafemi Joshua</p>
        <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "var(--ink-faint)", textTransform: "uppercase" }}>#/shelf</p>
      </footer>
    </>
  );
}
