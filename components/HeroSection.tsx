"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PrimaryButton } from "./PrimaryButton";
import { Reveal, SPRING, EASE, useFragmentField, FRAGMENTS, PANEL_TAGS } from "./home/bizShared";
import "./bizintro/bizintro.css";
import "./home/home-ported.css";

interface HeroSectionProps {
  onOpenWaitlist: () => void;
}

export function HeroSection({ onOpenWaitlist }: HeroSectionProps) {
  const reduce = useReducedMotion();
  const [converged, setConverged] = useState(false);
  const field = useFragmentField(FRAGMENTS.length);
  const on = converged || !!reduce;

  return (
    <div className="bizx">
      <section
        id="hero"
        className="hero relative flex flex-col items-center justify-center text-center min-h-svh w-full overflow-hidden px-6 pt-20"
      >
        {/* Aurora — unchanged from the original hero, sits over the music notes */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "70vh",
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, var(--brand-green-glow) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        <div className="relative flex flex-col items-center w-full" style={{ zIndex: 2 }}>
          <Reveal>
            <h1 className="t-display center narrow" style={{ maxWidth: 860 }}>
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
            aria-label="Eight disconnected tools converging into a single Lisnin platform"
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
            <p className="t-lead center narrow" style={{ maxWidth: 640 }}>
              Lisnin owns the distribution, publishing, websites and promotion rails — so your
              AI Manager runs your career instead of advising on it.
            </p>
            <div className="hero-cta">
              <PrimaryButton size="lg" onClick={onOpenWaitlist}>
                Join Beta
              </PrimaryButton>
              <p className="hero-note">Receive 1 free month subscription upon launch.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
