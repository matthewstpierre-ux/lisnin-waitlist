"use client";

/**
 * Motion primitives shared by the sections lifted from /i/bizintro.
 * Kept identical to the originals so the two pages stay in step.
 */
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * The hero fragment field is laid out for a wide stage (±300px from centre).
 * On a phone that puts most of it off-screen, so pull the positions in and
 * thin the field out rather than clipping it.
 */
export function fieldFor(width: number, total: number) {
  if (width >= 1100) return { scale: 1, count: total };
  if (width >= 820) return { scale: 0.82, count: total };
  if (width >= 620) return { scale: 0.64, count: Math.min(6, total) };
  if (width >= 420) return { scale: 0.46, count: Math.min(5, total) };
  return { scale: 0.4, count: Math.min(5, total) };
}

/** Tracks the viewport and returns the fragment-field scale and count for it. */
export function useFragmentField(total: number) {
  const [field, setField] = useState(() => ({ scale: 1, count: total }));
  useEffect(() => {
    const read = () => setField(fieldFor(window.innerWidth, total));
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, [total]);
  return field;
}

/**
 * The scattered tools an artist juggles today, used by both hero stages.
 * Order matters: narrow screens render only the first N, so the opening
 * entries are chosen to stay balanced above and below the centre line.
 */
export const FRAGMENTS = [
  { label: "Distributor", x: -238, y: -74, r: -7, dur: 11 },
  { label: "Royalty statement", x: 196, y: -92, r: 6, dur: 13 },
  { label: "Half-built website", x: -268, y: 40, r: 4, dur: 12 },
  { label: "Pitch email", x: 236, y: 54, r: -5, dur: 14 },
  { label: "Press kit", x: -168, y: 124, r: 3, dur: 13.5 },
  { label: "Spreadsheet", x: 92, y: 116, r: -6, dur: 12.5 },
  { label: "Ad dashboard", x: -104, y: -126, r: 8, dur: 10.5 },
  { label: "Radio tracker", x: 300, y: -16, r: 5, dur: 11.5 },
];

export const PANEL_TAGS = [
  "Distribution",
  "Publishing",
  "Website Builder",
  "PR",
  "Radio",
  "Playlists",
  "Marketing",
];

export const SPRING = { type: "spring", stiffness: 130, damping: 20, mass: 0.9 } as const;
export const SOFT = { type: "spring", stiffness: 70, damping: 18, mass: 1.1 } as const;
export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
