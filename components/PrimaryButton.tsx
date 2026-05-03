"use client";

import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "md" | "lg";
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  onClick,
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
}: PrimaryButtonProps) {
  const padding = size === "lg" ? "1rem 2.25rem" : "0.75rem 1.75rem";
  const fontSize = size === "lg" ? "1rem" : "0.9rem";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2, boxShadow: "0 8px 32px var(--brand-green-glow)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding,
        fontSize,
        fontFamily: "var(--font-outfit)",
        fontWeight: 600,
        background: disabled ? "#1A7A4A" : "var(--brand-green)",
        color: "var(--bg-base)",
        border: "none",
        borderRadius: "0.75rem",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.6 : 1,
        letterSpacing: "0.01em",
        position: "relative",
      }}
    >
      {/* Pulse glow ring at rest */}
      <motion.span
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ border: "2px solid var(--brand-green)" }}
        animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </motion.button>
  );
}
