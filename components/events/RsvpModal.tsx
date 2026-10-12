"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { RsvpForm } from "./RsvpForm";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
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
        <div data-theme="light">
          <motion.div
            className="fixed inset-0"
            style={{ background: "rgba(17,16,16,0.55)", backdropFilter: "blur(6px)", zIndex: 50 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 51 }}>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "440px",
                maxHeight: "88vh",
                overflowY: "auto",
                borderRadius: "1rem",
                background: "var(--bg-base)",
                border: "1px solid var(--border-default)",
                boxShadow: "0 0 0 1px var(--brand-green-glow), 0 24px 64px rgba(17,16,16,0.28)",
              }}
            >
              <button
                onClick={handleClose}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "var(--bg-elevated)",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: "0.375rem",
                  display: "flex",
                  borderRadius: "0.5rem",
                  zIndex: 1,
                }}
              >
                <X size={18} />
              </button>

              <div style={{ padding: "1.75rem 1.5rem 1.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)", margin: "0 0 1.25rem", paddingRight: "2rem" }}>
                  Reserve your seat
                </h2>
                <RsvpForm onSuccess={handleClose} />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
