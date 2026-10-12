"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./home/bizShared";
import "./bizintro/bizintro.css";
import "./home/home-ported.css";

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

export function DreamSection() {
  const reduce = useReducedMotion();
  return (
    <div className="bizx px-6">
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
    </div>
  );
}
