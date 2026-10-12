"use client";

import { motion } from "framer-motion";
import { DSP_LOGOS } from "@/lib/constants";
import { ease } from "@/lib/motion";

export function DSPMarquee() {
  return (
    <section className="w-full py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease }}
          className="text-center text-xs font-medium uppercase mb-8"
          style={{ color: "var(--text-muted)", letterSpacing: "0.12em", fontFamily: "var(--font-outfit)" }}
        >
          Get your music on:
        </motion.p>

        <div className="dsp-marquee">
          <div className="dsp-track">
            {DSP_LOGOS.map((logo) => (
              <img
                key={logo.file}
                src={`/logos/dsp/${logo.file}`}
                alt={logo.label}
                width={28}
                height={28}
              />
            ))}
            {/* Duplicate for seamless loop; hidden from assistive tech */}
            {DSP_LOGOS.map((logo) => (
              <img
                key={`${logo.file}-dup`}
                src={`/logos/dsp/${logo.file}`}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
              />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="text-center text-sm italic mt-8"
          style={{ color: "var(--text-muted)" }}
        >
          ...and 150+ more stores and platforms worldwide, at 0% commission.
        </motion.p>
      </div>
    </section>
  );
}
