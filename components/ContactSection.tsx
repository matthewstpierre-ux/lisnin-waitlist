"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { ease } from "@/lib/motion";

const INQUIRY_OPTIONS = ["Feature Request", "Partnerships", "Support", "Other"];
const TYPE_OPTIONS = ["Artist", "Brand", "Label"];

export function ContactSection({ onOpenPrivacy }: { onOpenPrivacy?: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", inquiry: "", type: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = {
    background: "var(--bg-subtle)",
    border: "1px solid var(--border-default)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-outfit)",
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease }}
          >
            <p
              className="text-xs font-medium uppercase mb-3"
              style={{ color: "var(--brand-green)", letterSpacing: "0.12em", fontFamily: "var(--font-outfit)" }}
            >
              Get in Touch
            </p>
            <h2
              className="font-bold mb-5"
              style={{
                fontFamily: "var(--font-epilogue)",
                fontSize: "clamp(2rem, 3.5vw + 1rem, 3.25rem)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Have a question, idea, or partnership in mind?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We read every message. For partnership inquiries, feature requests, or support — drop us a line.
            </p>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease }}
          >
            <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center gap-5 py-12"
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0.1, delay: 0.1 }}
                >
                  <CheckCircle2 size={52} color="var(--brand-green)" />
                </motion.div>
                <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-epilogue)", color: "var(--text-primary)" }}>
                  Message received.
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  We&apos;ll be in touch within 48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                {/* Honeypot */}
                <input type="text" name="website" value={form.website} onChange={e => update("website", e.target.value)} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <input
                  type="text"
                  placeholder="Name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={e => update("email", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    required
                    value={form.inquiry}
                    onChange={e => update("inquiry", e.target.value)}
                    className={inputClass}
                    style={{ ...inputStyle, appearance: "none" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                  >
                    <option value="" disabled>Inquiry type</option>
                    {INQUIRY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>

                  <select
                    required
                    value={form.type}
                    onChange={e => update("type", e.target.value)}
                    className={inputClass}
                    style={{ ...inputStyle, appearance: "none" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                  >
                    <option value="" disabled>Artist, Brand, or Label?</option>
                    {TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <textarea
                  placeholder="Message"
                  required
                  minLength={10}
                  rows={4}
                  value={form.message}
                  onChange={e => update("message", e.target.value)}
                  className={inputClass}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-green)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border-default)")}
                />

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#f87171" }}>{errorMsg}</p>
                )}

                <PrimaryButton type="submit" fullWidth disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Message"}
                </PrimaryButton>

                <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", textAlign: "center", color: "#4b5563" }}>
                  By submitting, you agree to our{" "}
                  <button onClick={onOpenPrivacy} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#22C55E", fontSize: "0.75rem", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Privacy Policy
                  </button>
                  .
                </p>
              </motion.form>
            )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
