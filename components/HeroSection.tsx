"use client";

import { motion } from "framer-motion";
import { HeadphonesScene } from "./animations/HeadphonesScene";
import { PrimaryButton } from "./PrimaryButton";
import { ease } from "@/lib/motion";

const HEADLINE = ["Your", "Entire", "Music", "Career,", "One", "Platform"];

interface HeroSectionProps {
  onOpenWaitlist: () => void;
}

export function HeroSection({ onOpenWaitlist }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center min-h-svh w-full overflow-hidden px-6 pt-20"
    >
      {/* Aurora background */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "70vh",
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, var(--brand-green-glow) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* 3D Headphones */}
      <HeadphonesScene />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto" style={{ zIndex: 2 }}>
        {/* Word-by-word headline */}
        <h1
          className="font-bold text-center mb-6"
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "clamp(2.5rem, 6vw + 1rem, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word + i}
              className="inline-block mr-[0.22em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.06 + 0.1, ease }}
            >
              {i === 4 ? (
                <span style={{ color: "var(--brand-green)" }}>{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Manage your releases, publishing, royalties, distribution, marketing and
          community — all from a single dashboard built for modern artists.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease }}
          className="flex flex-col items-center gap-3"
        >
          <PrimaryButton size="lg" onClick={onOpenWaitlist}>Join Beta</PrimaryButton>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="text-sm italic"
            style={{ color: "var(--text-muted)" }}
          >
            Receive 1 free month subscription upon launch.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
