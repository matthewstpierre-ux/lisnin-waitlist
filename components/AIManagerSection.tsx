"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal, SPRING, SOFT, EASE } from "./home/bizShared";
import "./bizintro/bizintro.css";
import "./home/home-ported.css";

const PROMPT = "Release my album everywhere and start the campaign.";
const ACTS: [string, string, string][] = [
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

export function AIManagerSection() {
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
    <div className="bizx">
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
    </div>
  );
}
