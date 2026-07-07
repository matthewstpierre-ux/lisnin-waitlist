"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

export function WaitlistModal({ isOpen, onClose, onOpenPrivacy }: WaitlistModalProps) {
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

      const { default: confetti } = await import("canvas-confetti");
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ["#1C6E3D", "#F5F5F0", "#29a354"] });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    background: "var(--bg-subtle)",
    border: "1px solid var(--border-default)",
    color: "var(--text-primary)",
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
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
                boxShadow: "0 0 0 1px var(--brand-green-glow), 0 24px 64px rgba(0,0,0,0.35)",
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
                  color: "var(--text-muted)",
                  padding: "0.25rem",
                  display: "flex",
                  borderRadius: "0.5rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
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
                    <CheckCircle2 size={56} color="var(--brand-green)" />
                  </motion.div>
                  <h2 style={{ fontFamily: "var(--font-epilogue)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                    You&apos;re on the list!
                  </h2>
                  <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
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
                    <Logo width={100} height={28} />
                  </div>

                  <h2 style={{ fontFamily: "var(--font-epilogue)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
                    Get on the list.
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
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
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                      placeholder="your@email.com"
                      required
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
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
                        background: "var(--brand-green-fill)",
                        color: "var(--text-on-brand)",
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

                  <p style={{ marginTop: "1rem", fontSize: "0.75rem", textAlign: "center", color: "var(--text-muted)" }}>
                    By joining, you agree to our{" "}
                    <button onClick={onOpenPrivacy} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--brand-green)", fontSize: "0.75rem", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                      Privacy Policy
                    </button>
                    .
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
