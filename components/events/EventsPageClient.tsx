"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SAULT_EVENT } from "@/lib/events";
import { RsvpModal } from "./RsvpModal";

const badgeStyle: React.CSSProperties = {
  padding: "0.4375rem 0.875rem",
  borderRadius: "999px",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border-default)",
  color: "var(--brand-green)",
  fontFamily: "var(--font-outfit)",
  fontSize: "0.8125rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const bioLinkStyle: React.CSSProperties = {
  color: "var(--brand-green)",
  fontWeight: 600,
  textDecoration: "underline",
  textUnderlineOffset: "2px",
};

export function EventsPageClient() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const openRsvp = () => setRsvpOpen(true);

  return (
    <div data-theme="light" style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Header */}
      <header className="w-full px-6 md:px-10 py-5 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" aria-label="Lisnin home">
          <Image src="/events/lisnin-logo.svg" alt="Lisnin" width={110} height={16} priority />
        </Link>
        <button
          onClick={openRsvp}
          style={{
            fontFamily: "var(--font-outfit)",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "var(--brand-green)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          RSVP
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-10 pb-10">
        {/* Hero — centered, title wraps full width above the poster */}
        <section className="flex flex-col items-center text-center pt-2 pb-10">
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--brand-green)",
              margin: "0 0 0.75rem",
            }}
          >
            {SAULT_EVENT.subtitle}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-epilogue)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4.4vw, 3rem)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: "0 0 1rem",
              letterSpacing: "-0.02em",
              maxWidth: "44rem",
            }}
          >
            {SAULT_EVENT.title}
          </h1>

          <Image
            src="/events/poster.jpg"
            alt="Navigating the Modern Music Business as an Independent Artist. Event poster featuring Matthew St. Pierre."
            width={1200}
            height={1200}
            priority
            style={{ width: "100%", maxWidth: "26rem", height: "auto", borderRadius: "1rem", border: "1px solid var(--border-subtle)", margin: "0 0 1.5rem" }}
          />

          <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-outfit)", lineHeight: 1.6, margin: "0 0 1.25rem", fontSize: "0.9375rem", maxWidth: "34rem" }}>
            A no-hype breakdown of how independent artists actually launch and run careers today, from
            someone working in the industry, plus the first public look anywhere at the platform built to
            run all of it.
          </p>

          <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-outfit)", margin: "0 0 0.25rem", fontSize: "0.9375rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>{SAULT_EVENT.dateLabel}</strong>
            {" "}&middot; Doors {SAULT_EVENT.doorsLabel} &middot; Program {SAULT_EVENT.programLabel}
          </p>
          <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-outfit)", margin: "0 0 1.25rem", fontSize: "0.9375rem" }}>
            {SAULT_EVENT.venueName}, {SAULT_EVENT.venueAddress}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2" style={{ marginBottom: "1.75rem" }}>
            <span style={badgeStyle}>Free admission</span>
            <span style={badgeStyle}>{SAULT_EVENT.capacity} seats</span>
            <span style={badgeStyle}>Exclusive Insights, Access &amp; Promotions</span>
          </div>

          <button
            onClick={openRsvp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.9375rem 2.25rem",
              fontFamily: "var(--font-outfit)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              background: "var(--brand-green-fill)",
              color: "var(--text-on-brand)",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
              marginBottom: "2.5rem",
            }}
          >
            Reserve My Seat
          </button>
        </section>

        {/* Hosted by — the full credibility pitch, hometown angle front and center */}
        <section className="py-8" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <h2
            style={{
              fontFamily: "var(--font-epilogue)",
              fontWeight: 700,
              fontSize: "1.375rem",
              color: "var(--text-primary)",
              margin: "0 0 0.875rem",
              letterSpacing: "-0.01em",
            }}
          >
            Hosted by Matthew St. Pierre
          </h2>
          <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-outfit)", lineHeight: 1.75, fontSize: "0.9375rem", margin: "0 0 1rem" }}>
            Matthew is a Sault Ste. Marie native who got his start managing his brother and running an
            independent record label and recording studio right here in the Sault, with early support from
            the Sault Ste. Marie Economic Development Corporation. He has since built a career at the center
            of the independent music industry: he is the founder of{" "}
            <Link href="/" target="_blank" rel="noopener noreferrer" style={bioLinkStyle}>Lisnin</Link> and the{" "}
            <a href="https://lonelylisteners.com" target="_blank" rel="noopener noreferrer" style={bioLinkStyle}>Lonely Listeners Club</a>,
            {" "}and a business partner at{" "}
            <a href="https://wracketmusic.com" target="_blank" rel="noopener noreferrer" style={bioLinkStyle}>Wracket Music</a>,
            {" "}a Toronto music supervision agency, where he leads business relations and development.
          </p>
          <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-outfit)", lineHeight: 1.75, fontSize: "0.9375rem", margin: 0 }}>
            Over nearly a decade in the business, his work has spanned Vice and brands including Apple,
            Amazon, and MTV, and he has personally worked with hundreds of artists, most independent,
            alongside artists signed to Def Jam, Atlantic, Warner, Universal, and Sony, helping push their
            music to tens of millions of streams. He has taken that expertise on the road too, speaking on
            independent music and technology across North America and Europe, including the SoAlive Music
            Conference in Bulgaria and Departure Festival / Canadian Music Week in Toronto. Now he is
            bringing all of it back home for one night in the Sault.
          </p>
        </section>

        <section className="pb-2 flex justify-center">
          <button
            onClick={openRsvp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.875rem 2rem",
              fontFamily: "var(--font-outfit)",
              fontWeight: 600,
              fontSize: "0.9rem",
              background: "var(--bg-elevated)",
              color: "var(--brand-green)",
              border: "1px solid var(--border-default)",
              borderRadius: "0.75rem",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            RSVP, it&apos;s free
          </button>
        </section>
      </main>

      <footer className="w-full px-6 md:px-10 py-8 max-w-4xl mx-auto flex flex-col items-center gap-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center justify-center gap-6">
          <Image src="/events/lisnin-logo.svg" alt="Lisnin" width={80} height={12} />
          <Image src="/events/llc-logo.png" alt="Lonely Listeners Club" width={34} height={34} />
          <Image src="/events/borderline-logo.jpg" alt="The Borderline, hyper-local arts radio" width={72} height={28} style={{ borderRadius: "0.25rem" }} />
        </div>
        <a
          href={SAULT_EVENT.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-outfit)", fontSize: "0.8125rem", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          View venue on map
        </a>
      </footer>

      <RsvpModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </div>
  );
}
