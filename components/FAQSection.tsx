"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { ease } from "@/lib/motion";

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className="border-b"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 transition-colors"
        style={{ background: "none", border: "none", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(17,24,39,0.4)")}
        onMouseLeave={e => (e.currentTarget.style.background = "none")}
      >
        <span
          className="text-base font-semibold pr-4"
          style={{
            fontFamily: "var(--font-epilogue)",
            color: open ? "var(--brand-green)" : "var(--text-primary)",
            transition: "color 200ms ease",
          }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ flexShrink: 0, color: "var(--text-muted)" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-5 text-sm leading-relaxed pr-10"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-outfit)" }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="relative w-full py-24 md:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "clamp(2rem, 4vw + 1rem, 3.75rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
