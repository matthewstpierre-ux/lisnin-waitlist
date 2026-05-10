"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = useCallback(() => {
    if (status !== "loading") onClose();
  }, [status, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => {
        onClose();
        setStatus("idle");
        setName("");
        setEmail("");
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Failed to join");
      setStatus("success");

      // Meta Pixel — Lead event fires on confirmed signup, not on click
      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead", {
          content_name: "Beta Waitlist",
          content_category: "Signup",
        });
      }

      const { default: confetti } = await import("canvas-confetti");
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ["#22C55E", "#F9FAFB", "#1A7A4A"] });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    background: "#0d1117",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f0ede8",
    fontSize: "0.875rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 50 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal container */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 51 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "480px",
                borderRadius: "1rem",
                padding: "2rem",
                background: "#111827",
                border: "1px solid rgba(34,197,94,0.25)",
                boxShadow: "0 0 0 1px rgba(34,197,94,0.05), 0 24px 64px rgba(0,0,0,0.6)",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: "0.25rem",
                  display: "flex",
                  borderRadius: "0.5rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f0ede8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "1.5rem 0", gap: "1rem" }}
                >
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.45, bounce: 0.1, delay: 0.1 }}
                  >
                    <CheckCircle2 size={56} color="#22C55E" />
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--font-epilogue)", fontSize: "1.5rem", fontWeight: 700, color: "#f0ede8", margin: 0 }}>
                    You&apos;re on the list!
                  </h2>
                  <p style={{ color: "#9ca3af", margin: 0, lineHeight: 1.6 }}>
                    Check your inbox — your first month is on us at launch.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{ marginBottom: "1.5rem" }}>
                    <Image src="/lisnin-logo.png" alt="Lisnin" width={100} height={28} style={{ objectFit: "contain" }} />
                  </div>

                  <h2 style={{ fontFamily: "var(--font-epilogue)", fontSize: "1.5rem", fontWeight: 700, color: "#f0ede8", margin: "0 0 0.5rem" }}>
                    Get on the list.
                  </h2>
                  <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
                    Be first to know when Lisnin launches — and claim your free month.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <input
                      type="text"
                      value={name}
                      onChange={e => { setName(e.target.value); setStatus("idle"); }}
                      placeholder="Your name"
                      required
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "#22C55E")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                      placeholder="your@email.com"
                      required
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "#22C55E")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />

                    {status === "error" && (
                      <p style={{ color: "#f87171", fontSize: "0.875rem", margin: 0 }}>{errorMsg}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        borderRadius: "0.75rem",
                        background: status === "loading" ? "#1a7a4a" : "#22C55E",
                        color: "#0a0a0a",
                        border: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: status === "loading" ? "not-allowed" : "pointer",
                        opacity: status === "loading" ? 0.7 : 1,
                        fontFamily: "inherit",
                        transition: "background 0.2s",
                        marginTop: "0.25rem",
                      }}
                    >
                      {status === "loading" ? "Joining..." : "Join Beta"}
                    </motion.button>
                  </form>

                  <p style={{ marginTop: "1rem", fontSize: "0.75rem", textAlign: "center", color: "#4b5563" }}>
                    We&apos;ll never share your info. Launch updates only.
                  </p>
                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
