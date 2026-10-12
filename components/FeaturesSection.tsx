"use client";

import { motion } from "framer-motion";
import { Radio, FileText, Globe, BookUser, Headphones, TrendingUp, Lock } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { PrimaryButton } from "./PrimaryButton";
import { ease, stagger, fadeUp } from "@/lib/motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Radio, FileText, Globe, BookUser, Headphones, TrendingUp,
};

interface FeaturesSectionProps {
  onOpenWaitlist: () => void;
}

export function FeaturesSection({ onOpenWaitlist }: FeaturesSectionProps) {
  return (
    <section id="features" className="relative w-full py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-medium uppercase mb-3"
            style={{ color: "var(--brand-green)", letterSpacing: "0.12em", fontFamily: "var(--font-outfit)" }}
          >
            The Foundation
          </p>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "clamp(2rem, 4vw + 1rem, 3.75rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Features to Manage Your Music Career
          </h2>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Five pieces of infrastructure, built and owned end to end. Use them yourself, or let the AI Manager run them for you.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.icon] ?? Headphones;
            const concealed = "concealed" in feature && feature.concealed;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className={`glass-card p-8 flex flex-col gap-4 relative ${concealed ? "" : "group cursor-default"}`}
                whileHover={
                  concealed
                    ? undefined
                    : {
                        y: -4,
                        borderColor: "rgba(34,197,94,0.3)",
                        boxShadow: "0 0 0 1px rgba(34,197,94,0.15), 0 8px 32px rgba(34,197,94,0.08), inset 0 0 20px rgba(34,197,94,0.04)",
                      }
                }
                transition={{ duration: 0.3, ease }}
              >
                <div aria-hidden={concealed || undefined} tabIndex={concealed ? -1 : undefined}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(34,197,94,0.12)" }}
                  >
                    <Icon size={20} color="var(--brand-green)" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-base mb-2"
                      style={{ fontFamily: "var(--font-epilogue)", color: "var(--text-primary)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {feature.description}
                    </p>
                  </div>
                </div>

                {concealed && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
                    style={{
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      background: "var(--overlay-conceal, rgba(0,0,0,0.04))",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                    >
                      <Lock size={16} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <span
                      className="text-xs font-semibold uppercase"
                      style={{ color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--font-outfit)" }}
                    >
                      To Be Announced
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, ease }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <PrimaryButton size="lg" onClick={onOpenWaitlist}>Join Beta</PrimaryButton>
          <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
            Receive 1 free month subscription upon launch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
