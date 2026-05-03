"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { MusicNoteField } from "@/components/animations/MusicNoteField";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ReadySection } from "@/components/ReadySection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WaitlistModal } from "@/components/WaitlistModal";
import { VideoModal } from "@/components/VideoModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <MotionConfig transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {/* Site-wide music notes */}
      <MusicNoteField count={14} />

      <Navbar
        onOpenWaitlist={() => setWaitlistOpen(true)}
        onOpenVideo={() => setVideoOpen(true)}
      />

      <main style={{ position: "relative", zIndex: 2 }}>
        <HeroSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <FeaturesSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <HowItWorksSection />
        <ReadySection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer onOpenWaitlist={() => setWaitlistOpen(true)} />

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </MotionConfig>
  );
}
