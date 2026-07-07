"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "./Logo";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
}

export function VideoModal({ isOpen, onClose, onOpenWaitlist }: VideoModalProps) {
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
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
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
              onClick={e => e.stopPropagation()}
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                maxWidth: 960,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
              }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-1 rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <X size={20} />
              </button>

              {/* Placeholder — swap with real video embed when available */}
              <div
                className="flex flex-col items-center justify-center gap-6 py-20 px-8"
                style={{ aspectRatio: "16/9", maxHeight: 540 }}
              >
                <Logo width={140} height={40} />
                <p
                  className="text-lg font-semibold text-center"
                  style={{ fontFamily: "var(--font-epilogue)", color: "var(--text-secondary)" }}
                >
                  Your entire music career, one platform.
                </p>
                <p
                  className="text-sm px-3 py-1.5 rounded-full border font-medium"
                  style={{
                    color: "var(--brand-green)",
                    borderColor: "var(--brand-green)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Available August 1st, 2026
                </p>
                <motion.button
                  onClick={() => { onClose(); onOpenWaitlist(); }}
                  whileHover={{ y: -2, boxShadow: "0 8px 32px var(--brand-green-glow)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: "0.75rem 1.75rem",
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 600,
                    background: "var(--brand-green-fill)",
                    color: "var(--text-on-brand)",
                    border: "none",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    position: "relative",
                  }}
                >
                  Join Waitlist
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
