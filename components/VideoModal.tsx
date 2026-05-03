"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
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
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
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
                border: "1px solid rgba(34,197,94,0.2)",
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
                <Image src="/lisnin-logo.png" alt="Lisnin" width={140} height={40} style={{ objectFit: "contain" }} />
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
                  Available May 19
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
