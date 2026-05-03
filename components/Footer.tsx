"use client";

import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const linkStyle = {
  color: "var(--text-secondary)",
  fontSize: "0.875rem",
  fontFamily: "var(--font-outfit)",
  cursor: "pointer",
  background: "none",
  border: "none",
  padding: 0,
  transition: "color 150ms ease",
  textAlign: "left" as const,
};

function FooterLink({ label, onClick, href }: { label: string; onClick?: () => void; href?: string }) {
  if (href) return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--brand-green)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
    >
      {label}
    </a>
  );
  return (
    <button
      onClick={onClick}
      style={linkStyle}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--brand-green)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
    >
      {label}
    </button>
  );
}

interface FooterProps {
  onOpenWaitlist: () => void;
}

export function Footer({ onOpenWaitlist }: FooterProps) {
  return (
    <footer
      className="relative w-full pt-20 pb-12 px-6"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand col */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Image src="/lisnin-logo.png" alt="Lisnin" width={190} height={56} style={{ objectFit: "contain", objectPosition: "left" }} />
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-outfit)" }}>
            Your entire music career, one platform. Manage your releases, publishing, royalties, distribution, marketing and community.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-outfit)" }}>
            © 2026 Lisnin Music Ltd. All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--font-outfit)" }}>
            Navigation
          </p>
          <FooterLink label="Beta" onClick={onOpenWaitlist} />
          <FooterLink label="Features" onClick={() => scrollTo("features")} />
          <FooterLink label="FAQ" onClick={() => scrollTo("faq")} />
          <FooterLink label="Help" onClick={() => scrollTo("contact")} />
        </div>

        {/* Social */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--font-outfit)" }}>
            Social
          </p>
          <FooterLink label="LinkedIn" href={SOCIAL_LINKS.linkedin} />
          <FooterLink label="Twitter" href={SOCIAL_LINKS.twitter} />
          <FooterLink label="Instagram" href={SOCIAL_LINKS.instagram} />
          <FooterLink label="Facebook" href={SOCIAL_LINKS.facebook} />
          <FooterLink label="TikTok" href={SOCIAL_LINKS.tiktok} />
        </div>

        {/* Company */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--font-outfit)" }}>
            Company
          </p>
          <FooterLink label="Contact Us" onClick={() => scrollTo("contact")} />
          <FooterLink label="Careers" href={SOCIAL_LINKS.careers} />
          <FooterLink label="Feature Request" onClick={() => scrollTo("contact")} />
        </div>
      </div>
    </footer>
  );
}
