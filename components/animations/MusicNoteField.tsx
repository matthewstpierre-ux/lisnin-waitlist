"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, useScroll, useVelocity, useTransform } from "framer-motion";

const NOTES = ["♪", "♫", "♬", "♩"];

interface Note {
  id: number;
  symbol: string;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function MusicNoteField({ count = 14 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const notes: Note[] = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: NOTES[Math.floor(seededRandom(i * 3) * NOTES.length)],
      y: seededRandom(i * 7) * 100,
      size: 16 + seededRandom(i * 11) * 32,
      opacity: 0.04 + seededRandom(i * 13) * 0.10,
      duration: 18 + seededRandom(i * 17) * 14,
      delay: -(seededRandom(i * 19) * 20),
    })),
    [count]
  );

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {notes.map((note) => (
          <span
            key={note.id}
            className="absolute select-none"
            style={{
              top: `${note.y}%`,
              left: `${seededRandom(note.id * 23) * 90}%`,
              fontSize: note.size,
              opacity: note.opacity * 0.5,
              color: "var(--brand-green)",
            }}
          >
            {note.symbol}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} scrollVelocity={scrollVelocity} />
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
  const speedMultiplier = useTransform(
    scrollVelocity,
    [-2000, 0, 2000],
    [2.5, 1, 2.5]
  );

  return (
    <motion.span
      className="absolute select-none"
      style={{
        top: `${note.y}%`,
        fontSize: note.size,
        opacity: note.opacity,
        color: "var(--brand-green)",
      }}
      animate={{ x: ["-10vw", "110vw"] }}
      transition={{
        duration: note.duration,
        delay: note.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {note.symbol}
    </motion.span>
  );
}
