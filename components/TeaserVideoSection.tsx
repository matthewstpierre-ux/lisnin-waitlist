"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "./PrimaryButton";
import { ease } from "@/lib/motion";

interface TeaserVideoSectionProps {
  onOpenWaitlist: () => void;
}

export function TeaserVideoSection({ onOpenWaitlist }: TeaserVideoSectionProps) {
  return (
    <section className="w-full px-6 pb-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease }}
        className="mx-auto flex flex-col items-center"
        style={{ maxWidth: 720 }}
      >
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}
        >
          <video
            className="block w-full"
            style={{ aspectRatio: "16/9", background: "#000" }}
            poster="/videos/lisnin-teaser-poster.jpg"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/videos/lisnin-teaser.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="mt-8">
          <PrimaryButton size="lg" onClick={onOpenWaitlist}>Join Lisnin</PrimaryButton>
        </div>
      </motion.div>
    </section>
  );
}
