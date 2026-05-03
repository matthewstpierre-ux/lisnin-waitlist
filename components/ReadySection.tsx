"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "./PrimaryButton";
import { ease } from "@/lib/motion";

interface ReadySectionProps {
  onOpenWaitlist: () => void;
}

export function ReadySection({ onOpenWaitlist }: ReadySectionProps) {
  return (
    <section id="ready" className="relative w-full py-24 md:py-36 px-6 overflow-hidden">
      {/* Green glow behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(34,197,94,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center gap-6"
        >
          {/* Pill */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              border: "1px solid var(--brand-green)",
              color: "var(--brand-green)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Ready to take charge of your career?
          </span>

          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "clamp(2rem, 4vw + 1rem, 3.75rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Are you ready to take your career to new heights with Lisnin?
          </h2>

          <p className="text-base leading-relaxed max-w-md" style={{ color: "var(--text-secondary)" }}>
            Join the Beta and be the first to access the platform with a free month subscription.
          </p>

          <PrimaryButton size="lg" onClick={onOpenWaitlist}>
            Join Beta
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}
