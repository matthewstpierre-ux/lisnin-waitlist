"use client";

import { PrimaryButton } from "./PrimaryButton";
import { Reveal } from "./home/bizShared";
import "./bizintro/bizintro.css";
import "./home/home-ported.css";

interface BetaOfferSectionProps {
  onOpenWaitlist: () => void;
}

export function BetaOfferSection({ onOpenWaitlist }: BetaOfferSectionProps) {
  return (
    <div className="bizx px-6">
      <section>
        <Reveal>
          <div className="offer">
            <span className="offer-badge">Beta · December 2026</span>
            <h2 className="offer-h">
              Join the beta and your first month is <em>free</em>.
            </h2>
            <p className="offer-sub">
              Not a trial of the entry plan — a full month of Grow, the highest tier, with
              every rail and the AI Manager switched on from day one.
            </p>
            <div className="offer-cta">
              <PrimaryButton size="lg" onClick={onOpenWaitlist}>
                Join Beta
              </PrimaryButton>
              <p className="offer-fine">Free to join. We&rsquo;ll email you when the beta opens.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
