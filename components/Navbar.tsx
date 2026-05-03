"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

const NAV_LINKS = [
  { label: "Demo", id: "demo" },
  { label: "Features", id: "features" },
  { label: "How it Works", id: "how-it-works" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface NavbarProps {
  onOpenWaitlist: () => void;
  onOpenVideo: () => void;
}

export function Navbar({ onOpenWaitlist, onOpenVideo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", "features", "how-it-works", "ready", "faq", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  function handleNavClick(id: string) {
    setMenuOpen(false);
    if (id === "demo") { onOpenVideo(); return; }
    scrollTo(id);
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(11,17,32,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex-shrink-0" aria-label="Go to top">
            <Image src="/lisnin-logo.png" alt="Lisnin" width={160} height={48} style={{ objectFit: "contain" }} priority />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                className="nav-link"
                data-active={activeSection === link.id}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <PrimaryButton onClick={onOpenWaitlist}>Join Beta</PrimaryButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--text-primary)" }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <motion.div animate={menuOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.2 }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col pt-24 px-8 pb-12"
            style={{ background: "rgba(11,17,32,0.97)", backdropFilter: "blur(16px)" }}
          >
            <nav className="flex flex-col gap-6 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="nav-link text-left text-2xl"
                  style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, color: "var(--text-primary)" }}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <PrimaryButton onClick={() => { setMenuOpen(false); onOpenWaitlist(); }} size="lg" fullWidth>
              Join Beta
            </PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
