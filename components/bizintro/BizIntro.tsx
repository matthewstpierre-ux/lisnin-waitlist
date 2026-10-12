"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useFragmentField, FRAGMENTS, PANEL_TAGS } from "../home/bizShared";
import "./bizintro.css";

/* ════════════════════════════════════════════════════════════════════
   Motion vocabulary — one spring, one ease, used everywhere.
   ════════════════════════════════════════════════════════════════════ */
const SPRING = { type: "spring" as const, stiffness: 130, damping: 20, mass: 0.9 };
const SOFT = { type: "spring" as const, stiffness: 70, damping: 18, mass: 1.1 };
const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard scroll reveal. Under reduced motion it renders composed, instantly. */
function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   1. HERO — fragments drift continuously, converge ONLY on hover.
   ════════════════════════════════════════════════════════════════════ */
function Hero({ onBook }: { onBook: () => void }) {
  const reduce = useReducedMotion();
  const [converged, setConverged] = useState(false);
  const field = useFragmentField(FRAGMENTS.length);
  const on = converged || !!reduce;

  return (
    <section className="hero">
      <Reveal>
        <h1 className="t-display center narrow" style={{ maxWidth: 780 }}>
          An entire music career, run by one agent.
        </h1>
      </Reveal>

      <div
        className="stage"
        onMouseEnter={() => setConverged(true)}
        onMouseLeave={() => setConverged(false)}
        onFocus={() => setConverged(true)}
        onBlur={() => setConverged(false)}
        tabIndex={0}
        role="img"
        aria-label="Seven disconnected tools converging into a single Lisnin platform"
      >
        {FRAGMENTS.slice(0, field.count).map((f, i) => (
          <motion.div
            key={f.label}
            className="frag"
            aria-hidden="true"
            style={{ x: "-50%", y: "-50%" }}
            initial={false}
            animate={
              on
                ? { translateX: 0, translateY: 0, rotate: 0, scale: 0.55, opacity: 0 }
                : {
                    translateX: [
                      f.x * field.scale,
                      f.x * field.scale + 10,
                      f.x * field.scale - 6,
                      f.x * field.scale,
                    ],
                    translateY: [
                      f.y * field.scale,
                      f.y * field.scale - 13,
                      f.y * field.scale + 8,
                      f.y * field.scale,
                    ],
                    rotate: [f.r, f.r + 2.2, f.r - 1.6, f.r],
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={
              on
                ? { ...SPRING, delay: i * 0.035 }
                : {
                    translateX: { duration: f.dur, repeat: Infinity, ease: "easeInOut" },
                    translateY: { duration: f.dur * 1.18, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: f.dur * 1.4, repeat: Infinity, ease: "easeInOut" },
                    scale: SPRING,
                    opacity: { duration: 0.45 },
                  }
            }
          >
            <i />
            {f.label}
          </motion.div>
        ))}

        <motion.div
          className="panel"
          style={{ x: "-50%", y: "-50%" }}
          initial={false}
          animate={on ? { scale: 1, opacity: 1 } : { scale: 0.88, opacity: 0 }}
          transition={on ? { ...SPRING, delay: 0.1 } : { duration: 0.3, ease: EASE }}
          aria-hidden={!on}
        >
          <div className="panel-t">One platform. One login.</div>
          <div className="panel-row">
            {PANEL_TAGS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </motion.div>

      </div>

      <Reveal delay={0.05}>
        <p className="t-lead center narrow" style={{ maxWidth: 620 }}>
          Lisnin owns the distribution, publishing, websites and promotion rails — so the
          AI Manager executes a career instead of advising on it.
        </p>
        <div className="chips">
          <span className="chip">
            Pre-seed <b>$250K USD</b>
          </span>
          <span className="chip">
            <b>$2.75M</b> post-money cap
          </span>
          <span className="chip">
            Launching <b>December 2026</b>
          </span>
        </div>
        <div className="hero-cta">
          <button className="btn" onClick={onBook}>
            Book a Call
          </button>
          <a className="btn btn-ghost" href="#ai-manager">
            See the AI Manager
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   2. THE WORLD WE'RE BUILDING — drifting clouds, light flares.
   ════════════════════════════════════════════════════════════════════ */
const CLOUDS = [
  { w: 380, h: 150, top: "8%", left: "-12%", dur: 46, drift: 90 },
  { w: 300, h: 120, top: "52%", left: "68%", dur: 58, drift: -110 },
  { w: 460, h: 170, top: "28%", left: "26%", dur: 52, drift: 70 },
  { w: 240, h: 100, top: "70%", left: "6%", dur: 64, drift: 130 },
];
const FLARES = [
  { s: 300, top: "2%", left: "16%", dur: 7.5 },
  { s: 220, top: "58%", left: "72%", dur: 9 },
  { s: 180, top: "34%", left: "46%", dur: 11 },
];

function Dream() {
  const reduce = useReducedMotion();
  return (
    <section className="dream">
      <div className="sky" aria-hidden="true" />
      {!reduce &&
        CLOUDS.map((c, i) => (
          <motion.div
            key={i}
            className="cloud"
            aria-hidden="true"
            style={{ width: c.w, height: c.h, top: c.top, left: c.left }}
            animate={{ x: [0, c.drift, 0], y: [0, i % 2 ? 14 : -14, 0] }}
            transition={{
              x: { duration: c.dur, repeat: Infinity, ease: "easeInOut" },
              y: { duration: c.dur * 0.7, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      {!reduce &&
        FLARES.map((f, i) => (
          <motion.div
            key={i}
            className="flare"
            aria-hidden="true"
            style={{ width: f.s, height: f.s, top: f.top, left: f.left }}
            animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.9, 1.12, 0.9] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.3 }}
          />
        ))}

      <div className="page">
        <div className="dream-inner">
          <Reveal>
            <p className="t-micro eyebrow">The world we&rsquo;re building</p>
            <p className="dream-q">
              Imagine a world where musicians can simply focus on making the music — and not
              on operating a business in one of the most confusing markets there is.
            </p>
            <p className="dream-sub">
              Some artists find a manager and the job gets easier. Most never will. Every
              artist deserves the infrastructure anyway.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   3. NUMBER BAND — counts up once on entry.
   ════════════════════════════════════════════════════════════════════ */
/**
 * Counts up on entry. The final value is what renders by default — in the
 * static HTML, under reduced motion, and if the observer never fires. It only
 * swaps to the animated value at the moment it is actually about to animate,
 * so the failure mode is "correct number, no animation" rather than "0".
 */
function Counter({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
  const final = `${prefix}${to.toFixed(decimals)}${suffix}`;
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (reduce || !inView) return;
    setRunning(true);
    const controls = animate(mv, to, {
      duration: 1.1,
      ease: EASE,
      onComplete: () => setRunning(false),
    });
    return () => controls.stop();
  }, [inView, reduce, mv, to]);

  if (reduce || !running) return <span ref={ref}>{final}</span>;
  return <motion.span ref={ref}>{text}</motion.span>;
}

function Band() {
  return (
    <section>
      <div className="page">
        <Reveal className="band">
          <div className="bcell">
            <div className="bval">
              <Counter to={80} suffix="K+" />
            </div>
            <div className="blab">Community, built before the product</div>
          </div>
          <div className="bcell">
            <div className="bval g">
              <Counter to={200} prefix="$" suffix="K+" />
            </div>
            <div className="blab">Moved to artists pre-product, zero paid acquisition</div>
          </div>
          <div className="bcell">
            <div className="bval">Month 7–8</div>
            <div className="blab">Breakeven on subscription revenue alone, ~1,140 subscribers</div>
          </div>
          <div className="bcell">
            <div className="bval g">
              <Counter to={5.4} prefix="$" suffix="B" decimals={1} />
            </div>
            <div className="blab">
              Addressable market size across independent distribution, publishing and marketing
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   4. THE PROBLEM — six tangled paths resolve into one line.
   ════════════════════════════════════════════════════════════════════ */
/**
 * Strands wrapping the central axis. A strand around a cylinder, seen from the
 * side, is a sine wave — so shifting its phase horizontally reads as the
 * cylinder rotating. Each is drawn past the viewBox on both sides and
 * translated by exactly one wavelength, so the loop is seamless.
 */
const AXIS_Y = 106;
const WAVE_LEN = 225;

function sineStrand(amp: number, phase: number, step = 9) {
  const pts: string[] = [];
  for (let x = -WAVE_LEN; x <= 900 + WAVE_LEN; x += step) {
    const y = AXIS_Y + amp * Math.sin((2 * Math.PI * x) / WAVE_LEN + phase);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}

/** Amplitude, phase, speed, opacity — larger/slower/brighter reads as nearer. */
const STRANDS = [
  { amp: 40, phase: 0, dur: 13, op: 0.95 },
  { amp: 33, phase: Math.PI * 0.5, dur: 16, op: 0.7 },
  { amp: 26, phase: Math.PI, dur: 19, op: 0.55 },
  { amp: 19, phase: Math.PI * 1.5, dur: 22, op: 0.42 },
  { amp: 12, phase: Math.PI * 0.25, dur: 26, op: 0.32 },
];

function Problem() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const live = reduce ? true : inView;

  return (
    <section>
      <div className="page">
        <Reveal>
          <p className="t-micro eyebrow">The problem</p>
          <h2 className="t-h2" style={{ maxWidth: 560 }}>
            A career built on fragments.
          </h2>
          <p className="t-body" style={{ maxWidth: 560, marginTop: 14 }}>
            A working artist is their own label, publisher, marketer and manager — stitching a
            dozen services together and paying for most of them.
          </p>
        </Reveal>

        <div ref={ref} style={{ marginTop: 26 }}>
          <svg
            className="tangle"
            viewBox="0 0 900 212"
            role="img"
            aria-label="Scattered workflows wrapping a single Lisnin line"
          >
            <text className="tlab" x="30" y="16">
              Distributor · Publishing · Websites · Press kit · Pitching · Ads
            </text>

            {STRANDS.map((st, i) => (
              <motion.path
                key={i}
                className="strand"
                d={sineStrand(st.amp, st.phase)}
                style={{ opacity: st.op }}
                initial={reduce ? false : { x: 0 }}
                animate={live && !reduce ? { x: -WAVE_LEN } : { x: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: st.dur, repeat: Infinity, ease: "linear" }
                }
              />
            ))}

            <motion.path
              d="M30,106 L870,106"
              stroke="var(--accent-vivid)"
              strokeWidth={2.4}
              strokeLinecap="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={live ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: 0.25 }}
            />
            <motion.circle
              r={4.5}
              cy={106}
              className="vd"
              initial={reduce ? false : { opacity: 0 }}
              animate={live ? { opacity: 1, cx: [30, 870] } : { opacity: 0, cx: 30 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { cx: { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }, opacity: { delay: 1.4 } }
              }
            />
            <motion.text
              className="tlab-a"
              x="30"
              y="88"
              initial={reduce ? false : { opacity: 0 }}
              animate={live ? { opacity: 1 } : { opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.9 }}
            >
              One platform · one login · one bill
            </motion.text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   5. AI MANAGER — typed prompt, then pulses into a 5-across rail grid.
   ════════════════════════════════════════════════════════════════════ */
const PROMPT = "Release my album everywhere and start the campaign.";
const ACTS = [
  ["Delivered to 150+ stores", "Done", "s-done"],
  ["Publishing registered worldwide", "Done", "s-done"],
  ["Website updated with the release", "Done", "s-done"],
  ["Pitching 40 blogs, radio and playlists", "Running", "s-run"],
  ["Listening Party campaign ready", "Approve", "s-ok"],
];

const RAILS = [
  {
    n: "01",
    name: "Distribution",
    copy: "150+ stores, 0% commission, unlimited releases, Dolby Atmos.",
    vis: (
      <svg viewBox="0 0 120 54" role="img" aria-label="One release fanning out to many stores">
        <circle className="vn" cx="12" cy="27" r="7" />
        <circle className="vd" cx="12" cy="27" r="2.5" />
        <path className="vl" d="M19,27 C44,27 48,8 70,8" />
        <path className="vl" d="M19,27 L70,27" />
        <path className="vl" d="M19,27 C44,27 48,46 70,46" />
        <rect className="vn" x="70" y="4" width="26" height="8" rx="2.5" />
        <rect className="vn" x="70" y="23" width="26" height="8" rx="2.5" />
        <rect className="vn" x="70" y="42" width="26" height="8" rx="2.5" />
        <text className="vt" x="100" y="30">+150</text>
      </svg>
    ),
  },
  {
    n: "02",
    name: "Publishing",
    copy: "Collected worldwide. The artist keeps 85%.",
    vis: (
      <svg viewBox="0 0 120 54" role="img" aria-label="Collection societies converging into one balance">
        <circle className="vl" cx="26" cy="27" r="17" />
        <ellipse className="vl" cx="26" cy="27" rx="7.5" ry="17" />
        <path className="vl" d="M9,27 L43,27" />
        <circle className="vd" cx="26" cy="10" r="2.4" />
        <circle className="vd" cx="43" cy="27" r="2.4" />
        <circle className="vd" cx="26" cy="44" r="2.4" />
        <path className="va" d="M47,20 C70,20 70,27 84,27" />
        <path className="va" d="M47,34 C70,34 70,27 84,27" />
        <rect className="vn" x="84" y="19" width="30" height="16" rx="4" style={{ stroke: "var(--border)" }} />
        <text className="vt" x="99" y="30" textAnchor="middle" style={{ fill: "var(--accent)" }}>ONE</text>
      </svg>
    ),
  },
  {
    n: "03",
    name: "Earkitz Websites",
    copy: "A site that fills itself from catalogue, streams and press.",
    vis: (
      <svg viewBox="0 0 120 54" role="img" aria-label="An answer becoming a live website section">
        <rect className="vn" x="4" y="12" width="40" height="11" rx="3" />
        <text className="vt" x="9" y="20">BOOKINGS?</text>
        <rect className="vn" x="4" y="29" width="24" height="11" rx="3" style={{ stroke: "var(--border)" }} />
        <text className="vt" x="9" y="37" style={{ fill: "var(--accent)" }}>YES</text>
        <path className="va" d="M50,27 L64,27" />
        <path className="va" d="M59,23 L64,27 L59,31" />
        <rect className="vn" x="72" y="6" width="44" height="42" rx="4" style={{ stroke: "var(--border)" }} />
        <rect x="78" y="12" width="18" height="4" rx="2" style={{ fill: "var(--accent)" }} />
        <rect x="78" y="21" width="32" height="2.5" rx="1.2" style={{ fill: "var(--rule)" }} />
        <rect x="78" y="27" width="26" height="2.5" rx="1.2" style={{ fill: "var(--rule)" }} />
        <rect className="vn" x="78" y="35" width="22" height="9" rx="2.5" style={{ stroke: "var(--border)" }} />
      </svg>
    ),
  },
  {
    n: "04",
    name: "Contact Directory",
    copy: "Thousands of vetted contacts. The pitch goes out as the artist.",
    vis: (
      <svg viewBox="0 0 120 54" role="img" aria-label="A pitch sent from the artist, a reply landing back">
        <rect className="vn" x="4" y="16" width="36" height="22" rx="4" />
        <text className="vt" x="9" y="26">FROM</text>
        <text className="vt" x="9" y="34" style={{ fill: "var(--accent)" }}>YOU</text>
        <path className="va" d="M44,23 C64,23 66,21 82,21" />
        <path className="va" d="M76,17 L82,21 L76,25" />
        <path className="vl" d="M82,33 C66,33 64,31 44,31" strokeDasharray="3 3" />
        <path className="vl" d="M50,27 L44,31 L50,35" />
        <rect className="vn" x="86" y="8" width="30" height="10" rx="2.5" />
        <rect className="vn" x="86" y="22" width="30" height="10" rx="2.5" />
        <rect className="vn" x="86" y="36" width="30" height="10" rx="2.5" />
      </svg>
    ),
  },
  {
    n: "05",
    name: "Listening Parties",
    copy: "Discord-native. One token, one listener. 75% of spend goes to them.",
    vis: (
      <svg viewBox="0 0 120 54" role="img" aria-label="Discord rooms filling as the prize pool rises">
        <rect className="vn" x="4" y="6" width="34" height="12" rx="3" />
        <circle className="vd" cx="11" cy="12" r="2" />
        <circle className="vd" cx="18" cy="12" r="2" />
        <rect className="vn" x="4" y="21" width="34" height="12" rx="3" />
        <circle className="vd" cx="11" cy="27" r="2" />
        <circle className="vd" cx="18" cy="27" r="2" />
        <circle className="vd" cx="25" cy="27" r="2" />
        <rect className="vn" x="4" y="36" width="34" height="12" rx="3" />
        <circle className="vd" cx="11" cy="42" r="2" />
        <circle className="vd" cx="18" cy="42" r="2" />
        <path className="va" d="M43,27 L58,27" />
        <path className="va" d="M53,23 L58,27 L53,31" />
        <rect x="66" y="38" width="10" height="10" rx="2" style={{ fill: "var(--glow)", stroke: "var(--border)" }} />
        <rect x="80" y="28" width="10" height="20" rx="2" style={{ fill: "var(--glow)", stroke: "var(--border)" }} />
        <rect x="94" y="16" width="10" height="32" rx="2" style={{ fill: "var(--accent)" }} />
      </svg>
    ),
  },
];

/** Hub-to-rail connector curves for the 5-across desktop layout. */
const CONN = [
  "M450,2 C450,40 130,26 90,70",
  "M450,2 C450,40 290,30 270,70",
  "M450,2 L450,70",
  "M450,2 C450,40 610,30 630,70",
  "M450,2 C450,40 770,26 810,70",
];

function AIManager() {
  const reduce = useReducedMotion();
  const promptRef = useRef<HTMLDivElement>(null);
  const railsRef = useRef<HTMLDivElement>(null);
  const promptIn = useInView(promptRef, { once: true, margin: "0px 0px -25% 0px" });
  const railsIn = useInView(railsRef, { once: true, margin: "0px 0px -18% 0px" });

  const [typed, setTyped] = useState(reduce ? PROMPT : "");
  const [done, setDone] = useState(!!reduce);

  useEffect(() => {
    if (reduce || !promptIn) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 26);
    return () => clearInterval(id);
  }, [promptIn, reduce]);

  const railsLive = reduce ? true : railsIn;

  return (
    <section id="ai-manager">
      <div className="page">
        <Reveal>
          <p className="t-micro eyebrow">The AI Manager</p>
          <h2 className="t-h2" style={{ maxWidth: 600 }}>
            It doesn&rsquo;t advise. It operates.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="prompt" ref={promptRef} style={{ marginTop: 18 }}>
            <div className="pline">
              <span className="pdot" aria-hidden="true" />
              <span className="ptext">
                {typed}
                {!reduce && !done && (
                  <motion.span
                    className="caret"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
                  />
                )}
              </span>
            </div>
            <div className="acts">
              {ACTS.map(([name, state, cls], i) => (
                <motion.div
                  className="act"
                  key={name}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={done ? { opacity: 1, y: 0 } : reduce ? {} : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, ease: EASE, delay: done && !reduce ? i * 0.1 : 0 }}
                >
                  <span className="aname">{name}</span>
                  <span className={`astate ${cls}`}>{state}</span>
                </motion.div>
              ))}
            </div>
            <p className="t-body" style={{ marginTop: 15, fontSize: ".82rem" }}>
              Nothing executes without the artist&rsquo;s confirmation.
            </p>
          </div>
        </Reveal>

        <div style={{ marginTop: 24 }} ref={railsRef}>
          <Reveal>
            <div className="hub">The AI Manager operates every rail below</div>
          </Reveal>

          <svg className="conn" viewBox="0 0 900 72" preserveAspectRatio="none" aria-hidden="true">
            {CONN.map((d, i) => (
              <path key={`b${i}`} d={d} className="conn-base" />
            ))}
            {!reduce &&
              CONN.map((d, i) => (
                <motion.path
                  key={`p${i}`}
                  d={d}
                  className="conn-live"
                  style={{ pathLength: 0.12 }}
                  initial={{ pathOffset: 0, opacity: 0 }}
                  animate={
                    railsLive
                      ? { pathOffset: [0, 0.88], opacity: [0, 1, 1, 0] }
                      : { pathOffset: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 1.15,
                    ease: "easeInOut",
                    delay: 0.15 + i * 0.16,
                    repeat: Infinity,
                    repeatDelay: 2.6,
                  }}
                />
              ))}
          </svg>

          <div className="rails">
            {RAILS.map((r, i) => (
              <motion.article
                className="rail"
                key={r.name}
                initial={reduce ? false : { opacity: 0, y: 16, borderColor: "var(--rule)" }}
                animate={
                  railsLive
                    ? { opacity: 1, y: 0, borderColor: "var(--border)" }
                    : reduce
                      ? {}
                      : { opacity: 0, y: 16 }
                }
                transition={{ ...SOFT, delay: reduce ? 0 : 0.5 + i * 0.16 }}
                whileHover={reduce ? undefined : { y: -4, transition: SPRING }}
              >
                <span className="rnum">RAIL {r.n}</span>
                <div className="rname">{r.name}</div>
                <p className="rcopy">{r.copy}</p>
                <div className="rvis">{r.vis}</div>
              </motion.article>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="moat">
              Every competitor&rsquo;s agent can only recommend or access a single feature
              on each platform. Lisnin&rsquo;s AI Manager executes everything in one place.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   6. FLYWHEEL — ring draws fully, dot orbits, nodes pulse in sequence.
   ════════════════════════════════════════════════════════════════════ */
const FLY_NODES = [
  { cx: 110, cy: 26, n: "01", t: "DIST." },
  { cx: 194, cy: 110, n: "02", t: "VERIFY" },
  { cx: 110, cy: 194, n: "03", t: "LIST" },
  { cx: 26, cy: 110, n: "04", t: "RAISE" },
];

function Flywheel() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const live = reduce ? true : inView;

  return (
    <section>
      <div className="page">
        <Reveal>
          <p className="t-micro eyebrow">The flywheel</p>
          <h2 className="t-h2" style={{ maxWidth: 580, marginBottom: 30 }}>
            Distribution is the funnel. The data is the asset.
          </h2>
        </Reveal>

        <div className="fly" ref={ref}>
          <svg className="flysvg" viewBox="0 0 220 220" role="img" aria-label="A four-stage cycle: distribute, verify, list, raise">
            <circle className="fring" cx="110" cy="110" r="84" />

            {/* Full ring, drawn all the way round. */}
            <motion.circle
              cx="110"
              cy="110"
              r="84"
              className="farc"
              transform="rotate(-90 110 110)"
              initial={reduce ? false : { pathLength: 0 }}
              animate={live ? { pathLength: 1 } : { pathLength: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.6, ease: EASE }}
            />

            {/* Breathing halo. */}
            {!reduce && (
              <motion.circle
                cx="110"
                cy="110"
                r="84"
                fill="none"
                stroke="var(--accent-vivid)"
                strokeWidth={8}
                style={{ filter: "blur(9px)" }}
                animate={live ? { opacity: [0.14, 0.42, 0.14] } : { opacity: 0 }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* Orbiting energy. */}
            {!reduce && (
              <motion.g
                style={{ transformBox: "view-box", transformOrigin: "110px 110px" }}
                animate={live ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="110" cy="26" r="9" fill="var(--accent-vivid)" opacity={0.2} style={{ filter: "blur(5px)" }} />
                <circle cx="110" cy="26" r="4.5" fill="var(--accent-vivid)" />
              </motion.g>
            )}

            {FLY_NODES.map((nd, i) => (
              <motion.g
                className="fnode"
                key={nd.n}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={live ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={reduce ? { duration: 0 } : { ...SPRING, delay: 0.5 + i * 0.14 }}
                style={{ transformBox: "view-box", transformOrigin: `${nd.cx}px ${nd.cy}px` }}
              >
                {!reduce && (
                  <motion.circle
                    cx={nd.cx}
                    cy={nd.cy}
                    r={22}
                    fill="var(--accent-vivid)"
                    animate={live ? { opacity: [0, 0.3, 0], scale: [0.85, 1.25, 0.85] } : { opacity: 0 }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: i * 2.75, times: [0, 0.08, 0.22] }}
                    style={{ filter: "blur(6px)" }}
                  />
                )}
                <circle cx={nd.cx} cy={nd.cy} r={21} />
                <text x={nd.cx} y={nd.cy - 3} className="n">{nd.n}</text>
                <text x={nd.cx} y={nd.cy + 8}>{nd.t}</text>
              </motion.g>
            ))}
          </svg>

          <Reveal className="fsteps">
            <div className="fstep"><b>01</b><div>Distribute<span> — releases go live on 150+ stores.</span></div></div>
            <div className="fstep"><b>02</b><div>Verify<span> — streaming and royalty data accrues on-platform.</span></div></div>
            <div className="fstep"><b>03</b><div>List<span> — verified data underwrites a listing, Month 16.</span></div></div>
            <div className="fstep"><b>04</b><div>Raise<span> — artists with traction raise capital from the community.</span></div></div>
            <p className="t-body" style={{ marginTop: 8 }}>
              Marketplace eligibility requires distributing on Lisnin. A catalogue held
              elsewhere never generates the data a raise requires — the switching incentive no
              competitor can copy.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   7. MODEL
   ════════════════════════════════════════════════════════════════════ */
/** Plans and feature lists, verbatim from Product Deck p.12 (PRICING). */
const PLANS = [
  {
    name: "START",
    price: "$50",
    hl: false,
    features: [
      "One artist profile",
      "Global distribution to 150+ platforms",
      "Unlimited releases",
      "Distribute in MP3 or WAV",
      "Build and host 1 Earkitz website",
    ],
  },
  {
    name: "MANAGE",
    price: "$124.99",
    hl: false,
    features: [
      "Everything in START",
      "Adds Dolby Atmos (spatial audio)",
      "Unlimited publishing registration",
      "Global publishing royalty collection",
      "Publishing revenue reports",
    ],
  },
  {
    name: "GROW",
    price: "$199.99",
    hl: true,
    features: [
      "Everything in MANAGE",
      "Build and host up to 3 Earkitz websites",
      "Unlimited Listening Party campaigns",
      "Lisnin AI Music Manager to automate campaigns",
    ],
  },
];

function Model() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });
  const live = reduce ? true : inView;

  return (
    <section>
      <div className="page">
        <Reveal>
          <p className="t-micro eyebrow">Pricing</p>
          <h2 className="t-h2" style={{ maxWidth: 620, marginBottom: 8 }}>
            The same stack costs $400&ndash;500. Ours is $199.99.
          </h2>
          <p className="t-body" style={{ maxWidth: 620, marginBottom: 22 }}>
            Publishing admin takes 15% of what we actually collect — the rest hits the
            artist&rsquo;s bank account directly.
          </p>
        </Reveal>

        <Reveal className="tiers">
          {PLANS.map((pl) => (
            <div className={`tier${pl.hl ? " hl" : ""}`} key={pl.name}>
              <div className="tn">{pl.name}</div>
              <div className="tp">{pl.price}<s>/yr</s></div>
              <ul className="tfeat">
                {pl.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <div ref={ref}>
          <svg className="chart" viewBox="0 0 900 290" role="img" aria-label="ARR growing from $59K at month 3 to $1.11M at month 24, breakeven at month 7 to 8">
            <line className="cg" x1="60" y1="240" x2="870" y2="240" />
            <line className="cg" x1="60" y1="170" x2="870" y2="170" />
            <line className="cg" x1="60" y1="100" x2="870" y2="100" />
            <line className="cg" x1="60" y1="36" x2="870" y2="36" />
            <line className="cbe" x1="196" y1="20" x2="196" y2="240" />
            <text className="csub" x="202" y="32">BREAKEVEN · MONTH 7–8 · ~1,140 SUBS</text>

            <motion.path
              className="cf"
              d="M90,232 C260,226 380,206 480,180 C620,142 720,96 860,44 L860,240 L90,240 Z"
              initial={reduce ? false : { opacity: 0 }}
              animate={live ? { opacity: 1 } : { opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.7 }}
            />
            <motion.path
              className="cl"
              d="M90,232 C260,226 380,206 480,180 C620,142 720,96 860,44"
              initial={reduce ? false : { pathLength: 0 }}
              animate={live ? { pathLength: 1 } : { pathLength: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.5, ease: EASE }}
            />
            {[[90, 232], [300, 214], [560, 160], [860, 44]].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                className="cd"
                cx={cx}
                cy={cy}
                r={i === 3 ? 6 : 5}
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                animate={live ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={reduce ? { duration: 0 } : { ...SPRING, delay: 0.8 + i * 0.14 }}
                style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}

            <text className="clab" x="90" y="262">$59K</text><text className="csub" x="90" y="276">MONTH 3 · 370</text>
            <text className="clab" x="276" y="262">$143K</text><text className="csub" x="276" y="276">MONTH 6 · 900</text>
            <text className="clab" x="536" y="262">$348K</text><text className="csub" x="536" y="276">MONTH 12 · 2,200</text>
            <text className="clab" x="802" y="262">$1.11M</text><text className="csub" x="802" y="276">MONTH 24 · 6,000</text>
          </svg>
        </div>

        <Reveal>
          <p className="t-body center" style={{ marginTop: 20, maxWidth: 660 }}>
            Breakeven at Month 7–8 on subscription revenue alone, no marketplace revenue
            modelled before Month 16. LTV:CAC clears 3:1 at triple the forecast churn.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   8. TEAM + 9. ASK
   ════════════════════════════════════════════════════════════════════ */
const PARTNER_LOGOS = [
  { file: "/logos/partners/cdl-logo.svg", label: "CDL-Montreal cohort company", height: 46 },
  { file: "/logos/partners/forge-logo.png", darkFile: "/logos/partners/forge-logo-white.png", label: "The Forge", height: 32 },
  { file: "/logos/partners/innovation-factory-logo.png", darkFile: "/logos/partners/innovation-factory-logo-white.png", label: "Innovation Factory", height: 30 },
  { file: "/logos/partners/microsoft-for-startups.png", label: "Microsoft for Startups", height: 36 },
  { file: "/logos/partners/aws-startups.png", label: "AWS Startups", height: 32 },
];

function Team() {
  return (
    <section>
      <div className="page">
        <Reveal>
          <p className="t-micro eyebrow">Team</p>
          <h2 className="t-h2" style={{ maxWidth: 600, marginBottom: 26 }}>
            Operators from inside the problem.
          </h2>
        </Reveal>
        <Reveal className="team">
          <div className="tm">
            <div className="tmn">Matthew St. Pierre</div>
            <div className="tmr">FOUNDER &amp; CEO</div>
            <p className="tmb">Nearly a decade in music, credits across 100M+ streams. Founder of the Lonely Listeners Club.</p>
          </div>
          <div className="tm">
            <div className="tmn">Vinay Singh</div>
            <div className="tmr">CHIEF TECHNOLOGY OFFICER</div>
            <p className="tmb">Fifteen years in full-stack engineering. Founder of Ajna Inc; built identity-verification systems for the Government of India.</p>
          </div>
          <div className="tm">
            <div className="tmn">Everton Lewis Jr.</div>
            <div className="tmr">PARTNERSHIPS</div>
            <p className="tmb">Former music supervisor at Apple and Head of Supervision at VICE, founder of Wracket Music. Several million in sync budgets annually.</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="adv">
            Advised by Nate Wolfe (ex-Ethereum), Mustafa Abdel Fattah and Ayman Abdalla, with
            mentorship through Creative Destruction Lab and The Forge.
          </p>
          <div className="sup">
            <span className="sup-l">Supported by</span>
            <div className="sup-row">
              {PARTNER_LOGOS.map((logo) =>
                logo.darkFile ? (
                  <span key={logo.label} style={{ display: "grid", height: logo.height }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.file} alt={logo.label} height={logo.height} style={{ height: logo.height, gridArea: "1 / 1" }} className="logo-light-img" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.darkFile} alt={logo.label} height={logo.height} style={{ height: logo.height, gridArea: "1 / 1" }} className="logo-dark-img" />
                  </span>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={logo.label} src={logo.file} alt={logo.label} height={logo.height} style={{ height: logo.height }} />
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Ask({ onBook }: { onBook: () => void }) {
  return (
    <section>
      <div className="page">
        <Reveal>
          <p className="t-micro eyebrow">The ask</p>
          <h2 className="t-h2" style={{ maxWidth: 620 }}>
            $250,000 to reach profitability without a bridge.
          </h2>
          <div className="chips" style={{ justifyContent: "flex-start", margin: "18px 0 0" }}>
            <span className="chip">SAFE · <b>$2.75M</b> post-money cap</span>
            <span className="chip">Private beta <b>November 2026</b></span>
            <span className="chip">Launch <b>December 2026</b></span>
          </div>
        </Reveal>

        <Reveal className="bks">
          <div className="bk"><div className="bkn">STAFFING · 38%</div><div className="bkd">Full-time founding team, in-house marketing and administrative team.</div></div>
          <div className="bk"><div className="bkn">ACQUISITION · 34%</div><div className="bkd">Paid and influencer channels on top of the community funnel, at benchmarked CPAs.</div></div>
          <div className="bk"><div className="bkn">ENGINEERING · 17%</div><div className="bkd">Finish the rails, harden the AI Manager, ship the December release and the UI rebuild behind it.</div></div>
          <div className="bk"><div className="bkn">LEGAL &amp; IP · 8%</div><div className="bkd">Publishing admin, curator network expansion, and the legal lane for the marketplace.</div></div>
        </Reveal>

        <Reveal>
          <p className="derisk">
            Secured capital already carries us to profitability. This round is not survival —
            it&rsquo;s speed.
          </p>
          <p className="t-body center" style={{ marginTop: 22, maxWidth: 620 }}>
            Lead investor closed. LvlUp Ventures in diligence. $110K cloud credits approved,
            non-dilutive pipeline out.
          </p>
          <div className="closer">
            <button className="btn" onClick={onBook}>Book a Call</button>
            <a className="btn btn-ghost" href="/Lisnin_OneSheet_2026.pdf" download="Lisnin One-Sheet.pdf">
              Download the one-sheet
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   BOOK A CALL — behaviour and payload preserved exactly.
   ════════════════════════════════════════════════════════════════════ */
function BookCall({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [err, setErr] = useState("");

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open, onClose]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    setStatus("loading");
    setErr("");
    const data = {
      name: (f.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (f.elements.namedItem("email") as HTMLInputElement).value.trim(),
      preferredTime: (f.elements.namedItem("preferredTime") as HTMLInputElement).value,
      website: (f.elements.namedItem("website") as HTMLInputElement).value,
      source: "Investor One-Pager",
      sourcePath: "lisnin.io/i/bizintro",
    };
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setErr("Something went wrong — please email matthew@lisnin.io directly.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="biz-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="biz-modal biz"
            role="dialog"
            aria-modal="true"
            aria-labelledby="biz-h"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={SPRING}
          >
            <button className="biz-close" onClick={onClose} aria-label="Close">✕</button>
            {status === "success" ? (
              <>
                <div className="biz-title">You&rsquo;re all set</div>
                <div className="biz-msg">
                  Thanks for getting in touch! Matthew will reach out to confirm your meeting
                  within 24 hours. Thanks for Lisnin!
                </div>
              </>
            ) : (
              <>
                <div className="biz-title" id="biz-h">Book a Call</div>
                <div className="biz-sub">
                  Grab time with Matthew to talk through the round, the model, or anything else.
                </div>
                <form onSubmit={submit}>
                  <input type="text" name="website" className="biz-hp" tabIndex={-1} autoComplete="off" />
                  <div className="biz-field">
                    <label className="biz-label" htmlFor="biz-name">Name</label>
                    <input className="biz-input" type="text" id="biz-name" name="name" required />
                  </div>
                  <div className="biz-field">
                    <label className="biz-label" htmlFor="biz-email">Email</label>
                    <input className="biz-input" type="email" id="biz-email" name="email" required />
                  </div>
                  <div className="biz-field">
                    <label className="biz-label" htmlFor="biz-time">Preferred Date &amp; Time</label>
                    <input className="biz-input" type="datetime-local" id="biz-time" name="preferredTime" required />
                  </div>
                  <button type="submit" className="biz-submit" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : "Request Call"}
                  </button>
                  {err && <div className="biz-msg err">{err}</div>}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════ */
export default function BizIntro() {
  const [booking, setBooking] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "" : "dark");
    try {
      localStorage.setItem("biz-theme", isDark ? "light" : "dark");
    } catch {}
    setDark(!isDark);
  }

  const open = () => setBooking(true);

  return (
    <div className="biz">
      <a className="skip" href="#main">Skip to content</a>

      <div className="page">
        <header className="topbar">
          <img className="logo-l" src="/lisnin-logo__black.svg" alt="Lisnin" width={136} height={38} />
          <img className="logo-d" src="/lisnin-logo__white.svg" alt="Lisnin" width={136} height={38} />
          <button className="toggle" onClick={toggle} aria-label="Toggle light or dark mode">
            <span className={`t-opt ${!dark ? "t-on" : ""}`}>LIGHT</span>
            <span className={`t-opt ${dark ? "t-on" : ""}`}>DARK</span>
          </button>
        </header>
      </div>

      <main id="main">
        <div className="page"><Hero onBook={open} /></div>
        <Dream />
        <Band />

        <Problem />
        <AIManager />

        <section>
          <div className="page">
            <Reveal>
              <div className="vpair">
                <div>
                  <div className="video">
                    <video controls playsInline preload="metadata" poster="/videos/lisnin-teaser-poster.jpg">
                      <source src="/videos/lisnin-teaser.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="vcap">Thirty seconds on what an artist gets.</div>
                </div>
                <div>
                  <div className="video">
                    <iframe
                      src="https://www.youtube.com/embed/D99GKED8BHM"
                      title="Lisnin — 60 Second Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="vcap">Sixty seconds, end to end, inside the product.</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Flywheel />
        <Model />
        <Team />
        <Ask onBook={open} />

        <div className="page">
          <footer className="foot">
            Matthew St. Pierre · Founder &amp; CEO · <a href="mailto:matthew@lisnin.io">matthew@lisnin.io</a>
            <br />
            Lisnin Music Inc. · Confidential · Full model, cap table and data room on request.
          </footer>
        </div>
      </main>

      <BookCall open={booking} onClose={() => setBooking(false)} />
    </div>
  );
}
