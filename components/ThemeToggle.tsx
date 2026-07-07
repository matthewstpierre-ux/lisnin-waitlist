"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "biz-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "");
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light/dark mode">
      <span className="t-opt t-light">☀ Light</span>
      <span className="t-opt t-dark">☽ Dark</span>
    </button>
  );
}
