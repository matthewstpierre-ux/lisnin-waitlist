"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, useScroll, useVelocity, useTransform } from "framer-motion";

const NOTES = ["♪", "♫", "♬", "♩"];

interface Note {
  id: number;
  symbol: string;
  topPercent: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

function seeded(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function MusicNoteField({ count = 16 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const notes: Note[] = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: NOTES[Math.floor(seeded(i * 3) * NOTES.length)],
      topPercent: 2 + seeded(i * 7) * 96,   // spread across full page height %
      size: 18 + seeded(i * 11) * 38,        // 18–56px
      opacity: 0.12 + seeded(i * 13) * 0.18, // 0.12–0.30 — actually visible
      duration: 16 + seeded(i * 17) * 18,    // 16–34s
      delay: -(seeded(i * 19) * 28),         // stagger start times
    })),
    [count]
  );

  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {notes.map((n) => (
          <span
            key={n.id}
            className="absolute select-none"
            style={{
              top: `${n.topPercent}%`,
              left: `${seeded(n.id * 23) * 85}%`,
              fontSize: n.size,
              opacity: n.opacity * 0.4,
              color: "var(--brand-green)",
            }}
          >
            {n.symbol}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} scrollVelocity={scrollVelocity} />
      ))}
    </div>
  );
}

function NoteItem({
  note,
  scrollVelocity,
}: {
  note: Note;
  scrollVelocity: ReturnType<typeof useVelocity>;
}) {
  // Faster notes are larger + slightly higher opacity
  const isForeground = note.size > 36;

  return (
    <motion.span
      className="absolute select-none"
      style={{
        top: `${note.topPercent}%`,
        fontSize: note.size,
        opacity: note.opacity,
        color: "var(--brand-green)",
        filter: isForeground ? "none" : "blur(0.5px)",
      }}
      animate={{ x: ["-8vw", "108vw"] }}
      transition={{
        duration: isForeground ? note.duration * 0.75 : note.duration,
        delay: note.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {note.symbol}
    </motion.span>
  );
}
