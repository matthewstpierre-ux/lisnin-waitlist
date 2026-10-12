"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { MusicNoteField } from "@/components/animations/MusicNoteField";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DreamSection } from "@/components/DreamSection";
import { AIManagerSection } from "@/components/AIManagerSection";
import { TeaserVideoSection } from "@/components/TeaserVideoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { BetaOfferSection } from "@/components/BetaOfferSection";
import { DSPMarquee } from "@/components/DSPMarquee";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ReadySection } from "@/components/ReadySection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WaitlistModal } from "@/components/WaitlistModal";
import { PrivacyModal } from "@/components/PrivacyModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <MotionConfig transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {/* Site-wide music notes */}
      <MusicNoteField count={14} />

      <Navbar onOpenWaitlist={() => setWaitlistOpen(true)} />

      <main style={{ position: "relative", zIndex: 2 }}>
        <HeroSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <DSPMarquee />
        <DreamSection />
        <AIManagerSection />
        <TeaserVideoSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <FeaturesSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <BetaOfferSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <HowItWorksSection />
        <ReadySection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <FAQSection />
        <ContactSection onOpenPrivacy={() => setPrivacyOpen(true)} />
      </main>

      <Footer onOpenWaitlist={() => setWaitlistOpen(true)} onOpenPrivacy={() => setPrivacyOpen(true)} />

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} onOpenPrivacy={() => setPrivacyOpen(true)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </MotionConfig>
  );
}
