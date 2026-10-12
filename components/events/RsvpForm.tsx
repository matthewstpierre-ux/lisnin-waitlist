"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface RsvpFormProps {
  onSuccess?: () => void;
}

const ROLES = ["Artist", "Business", "Brand", "Investor", "Other"];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  other: string;
  phone: string;
  website: string; // honeypot
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  other: "",
  phone: "",
  website: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  background: "var(--bg-subtle)",
  border: "1px solid var(--border-default)",
  color: "var(--text-primary)",
  fontSize: "0.9375rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--text-primary)",
  fontFamily: "var(--font-outfit)",
  marginBottom: "0.375rem",
  display: "block",
};

const errorStyle: React.CSSProperties = {
  color: "#c0392b",
  fontSize: "0.8125rem",
  marginTop: "0.25rem",
};

function focusHandlers(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--brand-green)";
}
function blurHandlers(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "var(--border-default)";
}

export function RsvpForm({ onSuccess }: RsvpFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status === "success" && onSuccess) {
      const t = setTimeout(onSuccess, 3200);
      return () => clearTimeout(t);
    }
  }, [status, onSuccess]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.role) next.role = "Please select a role";
    if (form.role === "Other" && !form.other.trim()) next.other = "Please specify your role";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/events/sault-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "Failed to RSVP");
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong submitting your RSVP. Please try again, your details are still filled in.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: "1rem 0 1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.875rem" }}
      >
        <CheckCircle2 size={40} color="var(--brand-green)" />
        <h3 style={{ fontFamily: "var(--font-epilogue)", fontSize: "1.1875rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
          You&apos;re on the list.
        </h3>
        <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, fontSize: "0.9rem", maxWidth: "22rem" }}>
          Tuesday, August 25. Doors 4:00 PM. The Art Hub at Spring, 504 Queen St. E., Sault Ste. Marie.
        </p>
        <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.8125rem" }}>
          Check your email for confirmation and a calendar invite.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", lineHeight: 1.6, marginTop: 0, marginBottom: "1.25rem" }}>
        Capacity is capped at 60. Bringing someone? They&apos;ll need to RSVP separately.
      </p>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={e => update("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" style={labelStyle}>First name</label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={e => update("firstName", e.target.value)}
              onFocus={focusHandlers}
              onBlur={blurHandlers}
              style={inputStyle}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && <p id="firstName-error" style={errorStyle}>{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" style={labelStyle}>Last name</label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={e => update("lastName", e.target.value)}
              onFocus={focusHandlers}
              onBlur={blurHandlers}
              style={inputStyle}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && <p id="lastName-error" style={errorStyle}>{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>Email address</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={e => update("email", e.target.value)}
            onFocus={focusHandlers}
            onBlur={blurHandlers}
            style={inputStyle}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" style={errorStyle}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="role" style={labelStyle}>Role</label>
          <select
            id="role"
            value={form.role}
            onChange={e => update("role", e.target.value)}
            onFocus={focusHandlers}
            onBlur={blurHandlers}
            style={{ ...inputStyle, cursor: "pointer" }}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
          >
            <option value="">Select one&hellip;</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.role && <p id="role-error" style={errorStyle}>{errors.role}</p>}
        </div>

        <AnimatePresence>
          {form.role === "Other" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <label htmlFor="other" style={labelStyle}>Please specify</label>
              <input
                id="other"
                type="text"
                value={form.other}
                onChange={e => update("other", e.target.value)}
                onFocus={focusHandlers}
                onBlur={blurHandlers}
                style={inputStyle}
                aria-invalid={!!errors.other}
                aria-describedby={errors.other ? "other-error" : undefined}
              />
              {errors.other && <p id="other-error" style={errorStyle}>{errors.other}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label htmlFor="phone" style={labelStyle}>Phone number <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={e => update("phone", e.target.value)}
            onFocus={focusHandlers}
            onBlur={blurHandlers}
            style={inputStyle}
          />
        </div>

        {status === "error" && (
          <p style={{ ...errorStyle, fontSize: "0.875rem" }}>{errorMsg}</p>
        )}

        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: "100%",
            padding: "0.9375rem",
            borderRadius: "0.75rem",
            background: "var(--brand-green-fill)",
            color: "var(--text-on-brand)",
            border: "none",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
            fontFamily: "var(--font-outfit)",
            transition: "background 0.2s",
            marginTop: "0.25rem",
          }}
        >
          {status === "loading" ? "Reserving your seat…" : "Reserve My Seat"}
        </motion.button>
      </form>
    </div>
  );
}
