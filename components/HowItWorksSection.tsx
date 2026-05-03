"use client";

import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { ease } from "@/lib/motion";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative w-full py-24 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-20"
        >
          <p
            className="text-xs font-medium uppercase mb-3"
            style={{ color: "var(--brand-green)", letterSpacing: "0.12em", fontFamily: "var(--font-outfit)" }}
          >
            How It Works
          </p>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "clamp(2rem, 4vw + 1rem, 3.75rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            From Application to Launch
            <br />
            in 4 Simple Steps
          </h2>
        </motion.div>

        {/* Steps — vertical mobile, horizontal desktop */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--border-default), transparent)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="relative flex flex-col gap-4"
              >
                {/* Mobile connector */}
                {i < STEPS.length - 1 && (
                  <div
                    className="lg:hidden absolute left-8 top-20 w-px"
                    style={{ height: "calc(100% + 3rem)", background: "var(--border-subtle)" }}
                  />
                )}

                {/* Step number */}
                <div className="relative">
                  {/* Dot for desktop connector */}
                  <div
                    className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{ background: "var(--brand-green)", top: "-2.5rem", left: "50%" }}
                  />
                  <span
                    className="text-7xl font-extrabold leading-none select-none"
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      background: "linear-gradient(135deg, var(--brand-green-deep), var(--brand-green))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-epilogue)", color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
