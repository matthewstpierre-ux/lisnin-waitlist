"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3 style={{ fontFamily: "var(--font-epilogue)", fontSize: "1rem", fontWeight: 700, color: "#22C55E", marginBottom: "0.75rem" }}>
        {title}
      </h3>
      <div style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: "0 0 0.75rem" }}>{children}</p>;
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ paddingLeft: "1.25rem", margin: "0 0 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ color: "#22C55E", textDecoration: "underline", textUnderlineOffset: "3px" }}>
      {children}
    </a>
  );
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)", zIndex: 60 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 61 }}>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "680px",
                maxHeight: "85vh",
                borderRadius: "1rem",
                background: "#0d1117",
                border: "1px solid rgba(34,197,94,0.2)",
                boxShadow: "0 0 0 1px rgba(34,197,94,0.05), 0 24px 64px rgba(0,0,0,0.7)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{
                padding: "1.5rem 2rem",
                borderBottom: "1px solid rgba(34,197,94,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-epilogue)", fontSize: "1.25rem", fontWeight: 700, color: "#f0ede8", margin: 0 }}>
                    Privacy Policy
                  </h2>
                  <p style={{ color: "#4b5563", fontSize: "0.75rem", margin: "0.25rem 0 0", fontFamily: "var(--font-outfit)" }}>
                    Effective May 11, 2026 · Last updated May 10, 2026
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: "0.25rem", borderRadius: "0.5rem", display: "flex", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f0ede8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable body */}
              <div style={{ overflowY: "auto", padding: "1.75rem 2rem", flex: 1 }}>

                <Section title="1. Introduction">
                  <P>Lisnin (&ldquo;Lisnin,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy of artists, fans, and visitors who interact with our website at lisnin.io and our platform services. This Privacy Policy explains what information we collect, how we use it, who we share it with, and the rights you have over your personal information.</P>
                  <P>By using our website, joining our beta waitlist, or contacting us, you agree to the collection and use of information in accordance with this Policy.</P>
                </Section>

                <Section title="2. Who We Are">
                  <P>Lisnin is operated by <strong style={{ color: "#e5e7eb" }}>Lisnin Music Inc</strong>, based in <strong style={{ color: "#e5e7eb" }}>Milton, Ontario, Canada</strong>. We are an all-in-one career platform for independent artists.</P>
                  <P>For privacy-related questions: <A href="mailto:hello@lisnin.io">hello@lisnin.io</A> · 949 Sprague Pl, Milton, ON, L9T 0K6</P>
                </Section>

                <Section title="3. Information We Collect">
                  <P><strong style={{ color: "#e5e7eb" }}>Information you provide directly:</strong></P>
                  <Ul items={[
                    "Beta Waitlist Signups: your name and email address.",
                    "Contact Forms: your name, email address, and message contents.",
                    "Other Voluntary Submissions: social media handles, artist profile details, or feedback.",
                  ]} />
                  <P><strong style={{ color: "#e5e7eb" }}>Information collected automatically:</strong></P>
                  <Ul items={[
                    "IP address and approximate location (city/region level)",
                    "Browser type and version",
                    "Device type and operating system",
                    "Pages you visit and time spent on each",
                    "Referring website or source",
                    "Date and time of access",
                  ]} />
                </Section>

                <Section title="4. Cookies and Tracking Technologies">
                  <P>We use cookies and similar technologies to operate our website and deliver relevant advertising:</P>
                  <Ul items={[
                    <><strong style={{ color: "#e5e7eb" }}>Essential cookies:</strong> Required for the website to function properly.</>,
                    <><strong style={{ color: "#e5e7eb" }}>Analytics cookies:</strong> Help us understand how visitors interact with our site.</>,
                    <><strong style={{ color: "#e5e7eb" }}>Advertising and marketing cookies:</strong> Used to deliver relevant ads and measure campaign effectiveness.</>,
                  ]} />
                  <P>You can disable cookies through your browser settings, though some features may not work properly if you do.</P>
                </Section>

                <Section title="5. Meta Pixel and Third-Party Advertising">
                  <P>Our website uses the <strong style={{ color: "#e5e7eb" }}>Meta Pixel</strong>, a tracking tool provided by Meta Platforms, Inc. It collects pages visited, actions taken (such as joining the beta waitlist), hashed email/name data, and browser/device/session information.</P>
                  <P>This is used to show relevant advertising on Facebook and Instagram, measure ad performance, and build custom and lookalike audiences.</P>
                  <P>Meta processes this data per its own <A href="https://www.facebook.com/privacy/policy">Privacy Policy</A>. You can manage preferences via <A href="https://www.facebook.com/adpreferences">Meta ad settings</A> or the <A href="https://youradchoices.ca/">Digital Advertising Alliance of Canada</A>.</P>
                </Section>

                <Section title="6. How We Use Your Information">
                  <Ul items={[
                    "To operate, maintain, and improve our website and services",
                    "To respond to your inquiries and provide customer support",
                    "To send you updates about our beta launch, product news, and platform features",
                    "To send you marketing and promotional communications about Lisnin",
                    "To deliver targeted advertising on Meta platforms and other channels",
                    "To analyze how our website is used and improve user experience",
                    "To comply with legal obligations and enforce our terms",
                    "To detect, prevent, and address fraud or security issues",
                  ]} />
                </Section>

                <Section title="7. Email Communications and Consent">
                  <P>By submitting your email through our beta waitlist, contact form, or any other form on lisnin.io, you <strong style={{ color: "#e5e7eb" }}>expressly consent</strong> to receive communications from Lisnin, including beta launch announcements, newsletters, marketing content, and responses to your inquiries.</P>
                  <P>We comply with Canada&apos;s Anti-Spam Legislation (CASL). Every commercial email includes a clear unsubscribe link. You may withdraw consent at any time by clicking that link or emailing <A href="mailto:hello@lisnin.io">hello@lisnin.io</A>.</P>
                </Section>

                <Section title="8. How We Share Your Information">
                  <P><strong style={{ color: "#e5e7eb" }}>We do not sell your personal information.</strong> We may share it in limited circumstances:</P>
                  <Ul items={[
                    <><strong style={{ color: "#e5e7eb" }}>Service Providers:</strong> Trusted third parties performing services on our behalf (email delivery, hosting, analytics).</>,
                    <><strong style={{ color: "#e5e7eb" }}>Advertising Partners:</strong> Meta (Facebook/Instagram) for advertising purposes as described in Section 5.</>,
                    <><strong style={{ color: "#e5e7eb" }}>Legal Requirements:</strong> When required by law or court order.</>,
                    <><strong style={{ color: "#e5e7eb" }}>Business Transfers:</strong> In connection with a merger, acquisition, or sale of our business.</>,
                  ]} />
                </Section>

                <Section title="9. Data Security">
                  <P>We use commercially reasonable security measures to protect your personal information. No method of internet transmission is 100% secure, and we cannot guarantee absolute security.</P>
                </Section>

                <Section title="10. Your Rights">
                  <P>Depending on where you reside, you may have the right to access, correct, delete, or receive a portable copy of your information, withdraw consent, or file a complaint with a privacy regulator such as the <A href="https://priv.gc.ca/">Office of the Privacy Commissioner of Canada</A>.</P>
                  <P>To exercise any of these rights, contact us at <A href="mailto:hello@lisnin.io">hello@lisnin.io</A>.</P>
                </Section>

                <Section title="11. Data Retention">
                  <P>We retain your personal information only as long as necessary to fulfill the purposes outlined in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements.</P>
                </Section>

                <Section title="12. International Data Transfers">
                  <P>Lisnin is based in Canada, but third-party providers (including Meta, hosting, and email services) may process your information in the United States or other countries. By using our website, you consent to such transfers.</P>
                </Section>

                <Section title="13. Children's Privacy">
                  <P>Our website is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has submitted information, contact us at <A href="mailto:hello@lisnin.io">hello@lisnin.io</A> and we will delete it.</P>
                </Section>

                <Section title="14. Changes to This Policy">
                  <P>We may update this Privacy Policy from time to time. When we make material changes, we will update the &ldquo;Last Updated&rdquo; date at the top and, where appropriate, notify you by email or site notice.</P>
                </Section>

                <Section title="15. Contact Us">
                  <P>Lisnin Music Inc · 949 Sprague Pl, Milton, ON, L9T 0K6</P>
                  <P><A href="mailto:hello@lisnin.io">hello@lisnin.io</A></P>
                </Section>

              </div>

              {/* Footer */}
              <div style={{ padding: "1rem 2rem", borderTop: "1px solid rgba(34,197,94,0.12)", flexShrink: 0 }}>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#4b5563", fontFamily: "var(--font-outfit)", textAlign: "center" }}>
                  This Privacy Policy is effective as of May 11, 2026 and applies to all visitors and users of lisnin.io.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
