"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PrimaryButton } from "./PrimaryButton";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
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

  // Auto-close on success
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => { onClose(); setStatus("idle"); setEmail(""); }, 4000);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "waitlist-site" }),
      });
      if (!res.ok) throw new Error("Failed to join");
      setStatus("success");

      // Confetti burst
      const { default: confetti } = await import("canvas-confetti");
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ["#22C55E", "#F9FAFB", "#1A7A4A"] });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[480px] rounded-2xl p-8"
              style={{
                background: "var(--bg-elevated)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <X size={20} />
              </button>

              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-6 gap-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <CheckCircle2 size={56} color="var(--brand-green)" />
                  </motion.div>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-epilogue)", color: "var(--text-primary)" }}>
                    You&apos;re on the list 🎵
                  </h2>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Check your inbox — your first month is on us at launch.
                  </p>
                </div>
              ) : (
                <>
                  {/* Logo */}
                  <div className="mb-6">
                    <Image src="/lisnin-logo.png" alt="Lisnin" width={100} height={28} style={{ objectFit: "contain" }} />
                  </div>

                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-epilogue)", color: "var(--text-primary)" }}>
                    Get on the list.
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Be the first to know when Lisnin launches — and claim your free month at launch.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-outfit)",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                    />

                    {status === "error" && (
                      <p className="text-sm" style={{ color: "#f87171" }}>{errorMsg}</p>
                    )}

                    <PrimaryButton type="submit" fullWidth disabled={status === "loading"}>
                      {status === "loading" ? "Joining..." : "Join Beta"}
                    </PrimaryButton>
                  </form>

                  <p className="mt-4 text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    By joining, you agree to receive launch updates. We&apos;ll never share your email.
                  </p>
                  <p className="mt-2 text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    Powered by Lisnin · earkitz.com
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
