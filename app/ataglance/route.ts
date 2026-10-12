import { NextResponse } from "next/server";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Lisnin.io — Industry One-Sheet</title>

<!-- Read theme before paint to prevent flash -->
<script>
(function(){
  var t = localStorage.getItem('biz-theme');
  if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
})();
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Epilogue:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── LIGHT MODE (default) ───────────────────────── */
  :root {
    --bg:               #F6F5F2;
    --surface:          #ECEAE6;
    --surface2:         #E3E1DD;
    --surface-alt:      #E6E4E0;
    --surface-traction: #E6E4E0;
    --green:            #1C6E3D;
    --green-light:      #1a7a41;
    --green-glow:       rgba(28,110,61,0.08);
    --green-border:     rgba(28,110,61,0.22);
    --text:             #111010;
    --muted:            rgba(12,11,9,0.52);
    --muted2:           rgba(12,11,9,0.30);
    --overlay-faint:    rgba(12,11,9,0.05);
    --overlay-subtle:   rgba(12,11,9,0.08);
    --overlay-medium:   rgba(12,11,9,0.13);
    --divider:          rgba(12,11,9,0.08);
    --grad-green:       linear-gradient(145deg, #E4EEE9 0%, #EAEAE6 100%);
    --grad-market:      linear-gradient(145deg, #E4EEE9 0%, #EBEBEA 100%);
    --grad-gtm:         linear-gradient(135deg, #E2EDE8 0%, #EAEAE6 100%);
    --grad-val:         linear-gradient(145deg, #E2EDE8 0%, #EAEAE6 100%);
    --video-shadow:     0 24px 48px -20px rgba(17,16,16,0.25);
  }

  /* ── DARK MODE ──────────────────────────────────── */
  [data-theme="dark"] {
    --bg:               #080808;
    --surface:          #0f0f0f;
    --surface2:         #141414;
    --surface-alt:      #0c0c0c;
    --surface-traction: #111111;
    --green:            #1C6E3D;
    --green-light:      #29a354;
    --green-glow:       rgba(28,110,61,0.18);
    --green-border:     rgba(28,110,61,0.38);
    --text:             #F5F5F0;
    --muted:            rgba(245,245,240,0.48);
    --muted2:           rgba(245,245,240,0.22);
    --overlay-faint:    rgba(245,245,240,0.06);
    --overlay-subtle:   rgba(245,245,240,0.07);
    --overlay-medium:   rgba(245,245,240,0.20);
    --divider:          rgba(245,245,240,0.05);
    --grad-green:       linear-gradient(145deg, #0f1f16 0%, #0f0f0f 100%);
    --grad-market:      linear-gradient(145deg, #0f1f16 0%, #111511 100%);
    --grad-gtm:         linear-gradient(135deg, #0a1a10 0%, #0f0f0f 100%);
    --grad-val:         linear-gradient(145deg, #0c160f 0%, #0f0f0f 100%);
    --video-shadow:     0 24px 48px -20px rgba(0,0,0,0.6);
  }

  html, body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background 0.25s ease, color 0.25s ease;
  }

  .page {
    max-width: 960px;
    margin: 0 auto;
    padding: 52px 48px 72px;
  }

  /* ── THEME TOGGLE ───────────────────────────────── */
  .theme-toggle {
    display: inline-flex;
    border: 1px solid var(--green-border);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    background: transparent;
    gap: 0;
    flex-shrink: 0;
    transition: border-color 0.2s ease;
  }
  .theme-toggle:hover { border-color: var(--green-light); }
  .t-opt {
    padding: 5px 12px;
    font-size: 10.5px;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    letter-spacing: 0.07em;
    color: var(--muted);
    transition: background 0.2s ease, color 0.2s ease;
    white-space: nowrap;
  }
  .t-light { color: var(--green-light); background: var(--green-glow); }
  .t-dark  { color: var(--muted); background: transparent; }
  [data-theme="dark"] .t-light { color: var(--muted); background: transparent; }
  [data-theme="dark"] .t-dark  { color: var(--green-light); background: var(--green-glow); }

  /* ── HEADER ─────────────────────────────────────── */
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 32px;
    margin-bottom: 36px;
    border-bottom: 1px solid var(--green-border);
    gap: 20px;
  }

  .logo-block { display: flex; flex-direction: column; gap: 6px; }
  .logo-light-img { display: block; height: 58px; width: auto; }
  .logo-dark-img  { display: none;  height: 58px; width: auto; }
  [data-theme="dark"] .logo-light-img { display: none; }
  [data-theme="dark"] .logo-dark-img  { display: block; }

  /* ── 3D LOGO ────────────────────────────────────── */
  .logo-3d-wrap { position: relative; width: 340px; height: 58px; }
  .logo-3d-wrap .logo-static { position: absolute; top: 0; left: 0; transition: opacity 0.3s ease; }
  .logo-3d-wrap canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.4s ease; filter: drop-shadow(0 0 3px rgba(41,163,84,0.55)) drop-shadow(0 0 7px rgba(41,163,84,0.3)); }
  .logo-3d-wrap.logo3d-ready canvas { opacity: 1; }
  .logo-3d-wrap.logo3d-ready .logo-static { opacity: 0; }

  .tagline {
    font-family: 'Epilogue', sans-serif;
    font-style: italic;
    font-size: 12.5px;
    color: var(--muted);
    letter-spacing: 0.01em;
  }
  .subtag {
    font-family: 'Epilogue', sans-serif;
    font-size: 11px;
    color: var(--muted2);
    letter-spacing: 0.01em;
    max-width: 340px;
  }

  .header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  .header-ask { text-align: right; }
  .ask-label {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--green-light);
    margin-bottom: 5px;
  }
  .ask-amount {
    font-size: 26px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: var(--text);
    line-height: 1;
  }
  .ask-note {
    font-size: 11px;
    color: var(--muted);
    margin-top: 5px;
    line-height: 1.5;
  }

  /* ── HERO STAT BAR ──────────────────────────────── */
  .hero-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--green-border);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 28px;
  }
  .hero-stat {
    background: var(--surface);
    padding: 20px 18px 18px;
    border-right: 1px solid var(--green-border);
    position: relative;
  }
  .hero-stat:last-child { border-right: none; }
  .hero-stat::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--green);
  }
  .hs-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted2);
    margin-bottom: 7px;
  }
  .hs-value {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: var(--text);
    line-height: 1;
  }
  .hs-value.green { color: var(--green-light); }
  .hs-sub {
    font-size: 10px;
    color: var(--muted);
    margin-top: 4px;
  }

  /* ── SECTION LABEL ──────────────────────────────── */
  .section-title {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted2);
    margin-bottom: 11px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--overlay-faint);
  }

  /* ── VIDEO ──────────────────────────────────────── */
  .video-wrap {
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--green-border);
    background: #000;
    box-shadow: var(--video-shadow);
    margin-bottom: 20px;
  }
  .video-wrap video {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
    background: #000;
  }

  /* ── PROBLEM / SOLUTION ─────────────────────────── */
  .ps-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--green-border);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .ps-side { padding: 24px 26px; }
  .ps-side.problem {
    background: var(--surface-alt);
    border-right: 1px solid var(--green-border);
  }
  .ps-side.solution { background: var(--grad-green); }
  .ps-eyebrow {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .ps-eyebrow.prob { color: var(--muted2); }
  .ps-eyebrow.sol  { color: var(--green-light); }
  .ps-head {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .ps-side.problem .ps-head { color: var(--text); opacity: 0.8; }
  .ps-side.solution .ps-head { color: var(--text); }
  .ps-body {
    font-family: 'Epilogue', sans-serif;
    font-size: 11.5px;
    line-height: 1.65;
    color: var(--muted);
  }

  /* ── TWO / THREE / FIVE COL ─────────────────────── */
  .two-col   { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px; }
  .five-col  { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px; }

  /* ── FEATURE CARD ───────────────────────────────── */
  .feature-card {
    background: var(--surface-alt);
    border: 1px solid var(--overlay-subtle);
    border-radius: 8px;
    padding: 14px 14px 12px;
  }
  .feature-num { color: var(--green-light); font-size: 10px; font-weight: 800; margin-bottom: 6px; }
  .feature-title { font-size: 12px; font-weight: 700; color: var(--text); margin-bottom: 7px; line-height: 1.3; }
  .feature-body { font-family: 'Epilogue', sans-serif; font-size: 10.5px; color: var(--muted); line-height: 1.5; margin-bottom: 8px; }
  .feature-price { font-size: 10px; font-weight: 700; color: var(--green-light); letter-spacing: 0.01em; }

  /* ── CARD ───────────────────────────────────────── */
  .card {
    background: var(--surface);
    border: 1px solid var(--overlay-subtle);
    border-radius: 10px;
    padding: 20px 22px 18px;
  }
  .card.green-bg {
    background: var(--grad-green);
    border-color: var(--green-border);
  }
  .card.dark {
    background: var(--surface-alt);
    border-color: var(--overlay-faint);
  }
  .card-eyebrow {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--green-light);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-eyebrow::before {
    content: '';
    width: 14px;
    height: 1.5px;
    background: var(--green-light);
    flex-shrink: 0;
  }
  .card-head {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 10px;
    line-height: 1.35;
  }
  .card-lead {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  /* ── FLYWHEEL / STEP FLOW ────────────────────────── */
  .flywheel-card { margin-bottom: 20px; }
  .fly {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-top: 4px;
  }
  .fly-step {
    background: var(--surface-alt);
    border: 1px solid var(--overlay-subtle);
    border-radius: 8px;
    padding: 12px 13px 11px;
    position: relative;
  }
  .fly-head {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--text);
    margin-bottom: 5px;
  }
  .fly-num { color: var(--green-light); margin-right: 5px; }
  .fly-body {
    font-family: 'Epilogue', sans-serif;
    font-size: 10.5px;
    color: var(--muted);
    line-height: 1.5;
  }
  .fly-quote {
    margin-top: 14px;
    font-family: 'Epilogue', sans-serif;
    font-style: italic;
    text-align: center;
    font-size: 12px;
    color: var(--text);
    line-height: 1.6;
    padding: 0 12px;
  }
  .fly-quote .muted-inline {
    display: block;
    font-style: normal;
    font-size: 10.5px;
    color: var(--muted);
    margin-top: 6px;
  }
  .fly-note {
    font-family: 'Epilogue', sans-serif;
    font-size: 10.5px;
    color: var(--muted2);
    margin-top: 12px;
    line-height: 1.6;
  }

  /* ── CASE ROWS ──────────────────────────────────── */
  .case-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider);
  }
  .case-row:last-of-type { border-bottom: none; }
  .case-name { font-weight: 700; font-size: 12px; color: var(--text); }
  .case-buyers {
    font-family: 'Epilogue', sans-serif;
    font-size: 10.5px;
    color: var(--muted);
    flex: 1;
    text-align: center;
  }
  .case-amt { font-weight: 800; color: var(--green-light); font-size: 12.5px; }
  .case-total {
    border-top: 1px solid var(--green-border);
    margin-top: 8px;
    padding-top: 10px;
    font-family: 'Epilogue', sans-serif;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.6;
  }
  .case-total b { color: var(--green-light); font-family: 'Outfit', sans-serif; }

  /* ── LISTS ──────────────────────────────────────── */
  .info-list { display: flex; flex-direction: column; gap: 8px; margin-top: 2px; }
  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-family: 'Epilogue', sans-serif;
    font-size: 11.5px;
    color: var(--muted);
    line-height: 1.5;
  }
  .info-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--green-light);
    flex-shrink: 0;
    margin-top: 6px;
  }
  .info-item strong { color: var(--text); font-family: 'Outfit', sans-serif; font-weight: 600; }

  /* ── METRIC ROWS (used for credit system) ───────── */
  .metric-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
    padding: 7px 0;
    border-bottom: 1px solid var(--divider);
  }
  .metric-row:last-of-type { border-bottom: none; }
  .metric-label {
    font-family: 'Epilogue', sans-serif;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.4;
  }
  .metric-value { font-size: 12.5px; font-weight: 700; color: var(--text); text-align: right; white-space: nowrap; }
  .metric-value.green { color: var(--green-light); }
  .metric-note {
    font-family: 'Epilogue', sans-serif;
    font-size: 10px;
    color: var(--muted2);
    margin-top: 10px;
    line-height: 1.55;
  }

  /* ── PRICING TABLE ──────────────────────────────── */
  .price-row {
    display: grid;
    grid-template-columns: 110px 90px 1fr;
    gap: 14px;
    padding: 11px 0;
    border-bottom: 1px solid var(--divider);
    align-items: baseline;
  }
  .price-row:last-child { border-bottom: none; }
  .price-plan { font-weight: 700; font-size: 12.5px; color: var(--text); }
  .price-amt { font-weight: 800; font-size: 12px; color: var(--green-light); }
  .price-includes {
    font-family: 'Epilogue', sans-serif;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ── TEAM ───────────────────────────────────────── */
  .team-card {
    background: var(--surface2);
    border: 1px solid var(--overlay-subtle);
    border-radius: 10px;
    padding: 18px 20px 16px;
    position: relative;
    overflow: hidden;
  }
  .team-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--green);
  }
  .team-initials {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 11px;
    letter-spacing: -0.02em;
  }
  .team-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    margin-bottom: 2px;
  }
  .team-role {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--green-light);
    margin-bottom: 9px;
    line-height: 1.4;
  }
  .team-bio {
    font-family: 'Epilogue', sans-serif;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.55;
  }

  /* ── CTA ────────────────────────────────────────── */
  .cta {
    background: var(--grad-gtm);
    border: 1px solid var(--green-border);
    border-radius: 10px;
    padding: 26px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  .cta-headline {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text);
    margin-bottom: 4px;
  }
  .cta-sub {
    font-family: 'Epilogue', sans-serif;
    font-size: 11.5px;
    color: var(--muted);
  }
  .cta-right { text-align: right; }
  .cta-email { font-size: 13px; font-weight: 700; color: var(--green-light); margin-bottom: 3px; }
  .cta-url { font-size: 11px; color: var(--muted); }

  /* ── DOWNLOAD BAR ───────────────────────────────── */
  .download-bar {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid var(--green-border);
    display: flex;
    justify-content: center;
  }
  .download-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 22px;
    border: 1px solid var(--green-border);
    border-radius: 8px;
    color: var(--muted);
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }
  .download-btn:hover {
    color: var(--green-light);
    border-color: var(--green-light);
    background: var(--green-glow);
  }

  /* ── BOOK A CALL ────────────────────────────────── */
  .book-call-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: var(--green-light);
    color: #ffffff;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: filter 0.2s ease, transform 0.2s ease;
  }
  .book-call-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
  .book-call-btn.top { margin-top: 2px; }

  .bc-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(6,8,7,0.55);
    backdrop-filter: blur(4px);
    z-index: 100;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .bc-overlay.open { display: flex; }
  .bc-modal {
    width: 100%;
    max-width: 420px;
    background: var(--bg);
    border: 1px solid var(--green-border);
    border-radius: 12px;
    padding: 28px 26px;
    position: relative;
    box-shadow: 0 24px 60px -20px rgba(0,0,0,0.4);
  }
  .bc-close {
    position: absolute;
    top: 14px;
    right: 14px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    padding: 4px;
  }
  .bc-close:hover { color: var(--text); }
  .bc-title {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 4px;
  }
  .bc-sub {
    font-family: 'Epilogue', sans-serif;
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 20px;
  }
  .bc-field { margin-bottom: 14px; }
  .bc-label {
    display: block;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .bc-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--green-border);
    border-radius: 7px;
    background: var(--surface);
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
  }
  .bc-input:focus { outline: none; border-color: var(--green-light); }
  .bc-submit {
    width: 100%;
    margin-top: 6px;
    padding: 11px;
    border: none;
    border-radius: 7px;
    background: var(--green-light);
    color: #ffffff;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: filter 0.2s ease;
  }
  .bc-submit:hover { filter: brightness(1.08); }
  .bc-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .bc-msg {
    font-family: 'Epilogue', sans-serif;
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--text);
  }
  .bc-msg.error { color: #c0392b; margin-top: 10px; font-size: 12px; }
  .bc-hp { position: absolute; left: -9999px; opacity: 0; }

  /* ── MOBILE ─────────────────────────────────────── */
  @media (max-width: 660px) {
    .page { padding: 32px 18px 56px; }

    .header { flex-direction: column; gap: 16px; }
    .header-right { align-items: flex-start; width: 100%; }
    .header-ask { text-align: left; }
    .logo-light-img, .logo-dark-img { height: 48px; }
    .logo-3d-wrap { width: 281px; height: 48px; }
    .subtag { max-width: none; }

    .hero-bar { grid-template-columns: 1fr 1fr; }
    .hero-stat:nth-child(2) { border-right: none; }
    .hero-stat:nth-child(3),
    .hero-stat:nth-child(4) { border-top: 1px solid var(--green-border); }

    .ps-wrap { grid-template-columns: 1fr; }
    .ps-side.problem { border-right: none; border-bottom: 1px solid var(--green-border); }
    .ps-side { padding: 20px; }

    .section-title { font-size: 8.5px; }

    .fly { grid-template-columns: 1fr 1fr; }
    .fly-quote { font-size: 11px; }

    .five-col { grid-template-columns: 1fr 1fr; }

    .two-col, .three-col { grid-template-columns: 1fr; gap: 12px; }

    .case-row { flex-direction: column; align-items: flex-start; gap: 2px; }
    .case-buyers { text-align: left; }

    .price-row { grid-template-columns: 1fr; gap: 2px; }

    .metric-row { flex-direction: column; gap: 1px; align-items: flex-start; }
    .metric-value { text-align: left; }

    .cta { flex-direction: column; gap: 18px; padding: 22px 20px; }
    .cta-right { text-align: left; }
    .cta-headline { font-size: 15px; }

    .bc-modal { padding: 24px 20px; }
  }

  /* ── TABLET ──────────────────────────────────────── */
  @media (min-width: 661px) and (max-width: 860px) {
    .page { padding: 44px 28px 64px; }

    .hero-bar { grid-template-columns: 1fr 1fr; }
    .hero-stat:nth-child(2) { border-right: none; }
    .hero-stat:nth-child(3),
    .hero-stat:nth-child(4) { border-top: 1px solid var(--green-border); }

    .ps-wrap { grid-template-columns: 1fr; }
    .ps-side.problem { border-right: none; border-bottom: 1px solid var(--green-border); }

    .fly { grid-template-columns: 1fr 1fr; }
    .five-col { grid-template-columns: repeat(3, 1fr); }

    .three-col { grid-template-columns: 1fr 1fr; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="logo-block">
      <div class="logo-3d-wrap" id="logo3d-wrap">
        <img src="/lisnin-logo__black.svg" alt="Lisnin" class="logo-light-img logo-static" />
        <img src="/lisnin-logo__white.svg" alt="Lisnin" class="logo-dark-img logo-static" />
        <canvas id="logo3d-canvas"></canvas>
      </div>
      <div class="tagline">Your Entire Music Career, One Platform</div>
      <div class="subtag">The unified music management platform for independent artists — distribution, publishing, promotion &amp; a path to capital.</div>
    </div>
    <div class="header-right">
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle light/dark mode">
        <span class="t-opt t-light">☀ Light</span>
        <span class="t-opt t-dark">☽ Dark</span>
      </button>
      <div class="header-ask">
        <div class="ask-label">Industry One-Sheet</div>
        <div class="ask-amount">Launching Fall 2026</div>
        <div class="ask-note">Matthew St. Pierre · Co-Founder &amp; CEO<br/>matthew@lisnin.io · Product demo &amp; press assets on request</div>
      </div>
      <button class="book-call-btn top" onclick="openBookCall()">📅 Book a Call</button>
    </div>
  </div>

  <!-- STAT STRIP -->
  <div class="hero-bar">
    <div class="hero-stat">
      <div class="hs-label">Distribution</div>
      <div class="hs-value">150+</div>
      <div class="hs-sub">DSPs via Eveara infrastructure</div>
    </div>
    <div class="hero-stat">
      <div class="hs-label">Commission</div>
      <div class="hs-value green">0%</div>
      <div class="hs-sub">Artists keep 100% of royalties</div>
    </div>
    <div class="hero-stat">
      <div class="hs-label">Entry Price</div>
      <div class="hs-value">$50/yr</div>
      <div class="hs-sub">Replaces a $400–500/yr tool stack</div>
    </div>
    <div class="hero-stat">
      <div class="hs-label">Community</div>
      <div class="hs-value green">80K+</div>
      <div class="hs-sub">Owned — Lonely Listeners Club</div>
    </div>
  </div>

  <!-- TEASER VIDEO -->
  <div class="section-title">Watch The Teaser</div>
  <div class="video-wrap">
    <video
      controls
      playsinline
      preload="metadata"
      poster="/videos/lisnin-teaser-poster.jpg"
    >
      <source src="/videos/lisnin-teaser.mp4" type="video/mp4" />
    </video>
  </div>

  <!-- PROBLEM / PLATFORM -->
  <div class="section-title">The Problem &amp; The Platform</div>
  <div class="ps-wrap">
    <div class="ps-side problem">
      <div class="ps-eyebrow prob">The Problem</div>
      <div class="ps-head">5–7 disconnected tools. One artist paying for all of them.</div>
      <div class="ps-body">36% of all music released is now fully independent, yet no single platform serves the complete career stack. Artists spend $400–500/yr on tools that never talk to each other — while $1B+ in publishing royalties goes unclaimed annually and no platform offers a real path to fan capital.</div>
    </div>
    <div class="ps-side solution">
      <div class="ps-eyebrow sol">The Platform</div>
      <div class="ps-head">Lisnin replaces the stack with one subscription — from $50/yr.</div>
      <div class="ps-body">150+ DSP distribution (0% commission, Dolby Atmos standard) · US + CA + European publishing admin · Earkitz website builder · 4,000+ industry contacts · Listening Party promotion inside Discord — and a Rights Marketplace (Year 2) where artists raise capital from fans and investors.</div>
    </div>
  </div>

  <!-- FIVE FEATURES AT LAUNCH -->
  <div class="section-title">Five Features At Launch</div>
  <div class="five-col">
    <div class="feature-card">
      <div class="feature-num">01</div>
      <div class="feature-title">Distribution</div>
      <div class="feature-body">Unlimited releases to 150+ DSPs. MP3, WAV &amp; Dolby Atmos. Automatic royalty splits, pre-save links, auto ISRC/UPC, Stripe payouts.</div>
      <div class="feature-price">$50/yr · 0% commission</div>
    </div>
    <div class="feature-card">
      <div class="feature-num">02</div>
      <div class="feature-title">Publishing Admin</div>
      <div class="feature-body">Registration across NA &amp; Europe — ASCAP, MLC, SoundExchange, SOCAN, CMRRA, ACTRA RACS. You choose what to register; withdraw royalties in-app.</div>
      <div class="feature-price">$124.99/yr · sync via Wracket</div>
    </div>
    <div class="feature-card">
      <div class="feature-num">03</div>
      <div class="feature-title">Earkitz</div>
      <div class="feature-body">Answer a few questions, get a hosted site at earkitz.com/yourname — press kits, booking kits, touring/ticketing or a full brand website.</div>
      <div class="feature-price">Included · proven at $250/kit</div>
    </div>
    <div class="feature-card">
      <div class="feature-num">04</div>
      <div class="feature-title">Contact Directory</div>
      <div class="feature-body">Submit to playlists, blogs &amp; radio with monthly credits. Sends from your own email; bounced sends auto-refund. Genre-tagged, curated.</div>
      <div class="feature-price">Credits: 10 / 50 / 125 per tier</div>
    </div>
    <div class="feature-card">
      <div class="feature-num">05</div>
      <div class="feature-title">Listening Party</div>
      <div class="feature-body">Promote to thousands of active listeners inside partner Discord communities — verified plays, leaderboards &amp; monthly raffle prize pool.</div>
      <div class="feature-price">$0.10/token · 75% to prize pool</div>
    </div>
  </div>

  <!-- LISTENING PARTY FLOW -->
  <div class="section-title">Listening Party — Campaign Flow</div>
  <div class="card flywheel-card">
    <div class="fly">
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">01</span>SELECT</div>
        <div class="fly-body">Pick partner communities by genre &amp; size</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">02</span>ESTIMATE</div>
        <div class="fly-body">Projected listener reach before you commit</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">03</span>CONFIRM</div>
        <div class="fly-body">$0.10 per active listener reached</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">04</span>TRACK</div>
        <div class="fly-body">Live per-community results dashboards</div>
      </div>
    </div>
    <div class="fly-note">First to market — no comparable Discord-native music promotion network exists. Prototype placed Top 10 of 10,000+ at Solana&rsquo;s Grizzlython.</div>
  </div>

  <!-- CONTACT DIRECTORY CREDITS -->
  <div class="section-title">Contact Directory — Credit System</div>
  <div class="card" style="margin-bottom: 20px;">
    <div class="metric-row"><div class="metric-label">Base plan</div><div class="metric-value">10 credits/mo</div></div>
    <div class="metric-row"><div class="metric-label">Pub Admin plan</div><div class="metric-value">50 credits/mo</div></div>
    <div class="metric-row"><div class="metric-label">Full Stack plan</div><div class="metric-value green">125 credits/mo</div></div>
    <div class="metric-note">Top-ups: $5 = 50 · $8.99 = 100 · $17.99 = 250 · $29.99 = 500 · $49.99 = 1,000 credits. 1 credit = 1 submission · monthly credits reset; purchased credits last 12 months · categories: Playlists, Blogs, College/Public/Commercial Radio.</div>
  </div>

  <!-- YEAR TWO MARKETPLACE -->
  <div class="section-title">Year Two — The Music Rights Marketplace (Invite-Only)</div>
  <div class="card flywheel-card">
    <div class="card-head">Artists distributing with Lisnin list songs to license or sell rights to music investors — underwritten by 12+ months of verified, on-platform streaming data.</div>
    <div class="fly">
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">01</span>SELECT SONG</div>
        <div class="fly-body">Any release distributed through Lisnin</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">02</span>REVENUE FORECAST</div>
        <div class="fly-body">Verified history projects earnings</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">03</span>SET PRICE</div>
        <div class="fly-body">License or sell, share, term, floor</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">04</span>LIST FOR SALE</div>
        <div class="fly-body">Data-backed listings, invite-only buyers</div>
      </div>
    </div>
  </div>
  <div class="two-col">
    <div class="card">
      <div class="card-eyebrow">Community Proof — Run Manually, Three Times</div>
      <div class="case-row">
        <div class="case-name">Andy Polk</div>
        <div class="case-buyers">180+ community buyers</div>
        <div class="case-amt">$53,000</div>
      </div>
      <div class="case-row">
        <div class="case-name">J-Minu$</div>
        <div class="case-buyers">120+ community buyers</div>
        <div class="case-amt">$45,000</div>
      </div>
      <div class="case-row">
        <div class="case-name">Moula 1st</div>
        <div class="case-buyers">30+ community buyers</div>
        <div class="case-amt">$10,000</div>
      </div>
      <div class="case-total"><b>$200K+ raised across manual campaigns</b> — real dollars, zero paid acquisition. Royal.io&rsquo;s 2024 exit left the consumer rights market open; Lisnin re-enters on Web2/Stripe rails at Month 16.</div>
    </div>
    <div class="card dark">
      <div class="card-eyebrow">Why It Matters To Artists</div>
      <div class="fly-quote" style="padding: 0; margin-top: 0; text-align: left;">
        &ldquo;Artists won&rsquo;t switch distributors to save $10 a year. They&rsquo;ll switch for access to capital.&rdquo;
      </div>
      <div class="info-list" style="margin-top: 16px;">
        <div class="info-item"><div class="info-dot"></div><strong>No catalog dilution</strong> — invite-only in Year 2, entirely opt-in for artists who want it</div>
        <div class="info-item"><div class="info-dot"></div><strong>Verified data, not speculation</strong> — 12+ months of real on-platform streaming history backs every listing</div>
        <div class="info-item"><div class="info-dot"></div><strong>Built-in buyer pool</strong> — Lisnin&rsquo;s own 80K community already includes active music rights investors</div>
        <div class="info-item"><div class="info-dot"></div><strong>No extra cost to access</strong> — unlocked simply by distributing through Lisnin, no separate signup or fee</div>
      </div>
    </div>
  </div>

  <!-- PRICING -->
  <div class="section-title">Pricing &amp; Subscriptions</div>
  <div class="card" style="margin-bottom: 20px;">
    <div class="price-row">
      <div class="price-plan">Base</div>
      <div class="price-amt">$50/yr</div>
      <div class="price-includes">Unlimited distribution · 0% commission · Earkitz builder · release tools · 10 credits/mo</div>
    </div>
    <div class="price-row">
      <div class="price-plan">Pub Admin</div>
      <div class="price-amt">$124.99/yr+</div>
      <div class="price-includes">Publishing registration &amp; royalty collection (US/CA/EU) · sync consideration · 50 credits/mo</div>
    </div>
    <div class="price-row">
      <div class="price-plan">Full Stack</div>
      <div class="price-amt">$199/yr+</div>
      <div class="price-includes">Full Contact Directory · 125 credits/mo · priority sync pitching — the complete stack</div>
    </div>
    <div class="price-row">
      <div class="price-plan">Add-ons</div>
      <div class="price-amt">from $5</div>
      <div class="price-includes">Credit top-ups · Listening Party tokens ($0.10) · Directory standalone $10/mo or $89.99/yr</div>
    </div>
  </div>

  <!-- COMMUNITY -->
  <div class="section-title">The Community — Lonely Listeners Club</div>
  <div class="card dark" style="margin-bottom: 20px;">
    <div class="card-lead">Four years of indie coverage &amp; artist spotlights built one of independent music&rsquo;s most trusted tastemaker brands — and Lisnin&rsquo;s owned acquisition channel.</div>
    <div class="info-list">
      <div class="info-item"><div class="info-dot"></div><strong>70K TikTok</strong> — discovery content, hundreds of thousands of monthly views</div>
      <div class="info-item"><div class="info-dot"></div><strong>4K Discord</strong> — the deepest layer, where $200K+ moved to artists</div>
      <div class="info-item"><div class="info-dot"></div><strong>9K X</strong> — active in the industry conversation</div>
      <div class="info-item"><div class="info-dot"></div><strong>Inner circle</strong> — the most engaged members are music rights investors: the marketplace&rsquo;s built-in buyer pool</div>
      <div class="info-item"><div class="info-dot"></div><strong>$0-CPA funnel</strong> — 40–60 organic subscribers/month at launch</div>
    </div>
  </div>

  <!-- TEAM -->
  <div class="section-title">The Team</div>
  <div class="three-col">
    <div class="team-card">
      <div class="team-initials">MS</div>
      <div class="team-name">Matthew St. Pierre</div>
      <div class="team-role">CEO &amp; Co-Founder</div>
      <div class="team-bio">8+ yrs across label founding, artist development, sync biz dev &amp; web3 launches. Built the Lonely Listeners Club to 80K+ over 4 years, facilitating $200K+ raised for artists.</div>
    </div>
    <div class="team-card">
      <div class="team-initials">VS</div>
      <div class="team-name">Vinay Singh</div>
      <div class="team-role">CTO &amp; Co-Founder</div>
      <div class="team-bio">Founder of Ajna Inc. — a 13+ engineer product studio. Deep SaaS architecture; brings a full development team to the cap table, cutting build cost and technical risk from day one.</div>
    </div>
    <div class="team-card">
      <div class="team-initials">EL</div>
      <div class="team-name">Everton Lewis Jr.</div>
      <div class="team-role">Partnerships &amp; Artist Relations</div>
      <div class="team-bio">Founder of Wracket Music Supervision ($3.4M+ annual sync budgets); prev. Vice, Apple. Deep licensing and label relationships — priority placement access from launch day.</div>
    </div>
  </div>

  <!-- CTA -->
  <div class="cta">
    <div>
      <div class="cta-headline">Want the full platform walkthrough?</div>
      <div class="cta-sub">Product demo, press assets &amp; early access details on request</div>
    </div>
    <div class="cta-right">
      <button class="book-call-btn" onclick="openBookCall()" style="margin-bottom:10px;">📅 Book a Call</button>
      <div>
        <a href="mailto:matthew@lisnin.io" class="cta-email" style="text-decoration:none;">matthew@lisnin.io</a>
      </div>
      <div class="cta-url">lisnin.io · Launching Fall 2026</div>
    </div>
  </div>

  <!-- DOWNLOAD -->
  <div class="download-bar">
    <a href="/Lisnin_Industry_OneSheet.pdf" download="Lisnin Industry One-Sheet.pdf" class="download-btn">
      ↓ Download PDF
    </a>
  </div>

</div>

<!-- BOOK A CALL MODAL -->
<div class="bc-overlay" id="bc-overlay" onclick="if(event.target===this) closeBookCall()">
  <div class="bc-modal">
    <button class="bc-close" onclick="closeBookCall()" aria-label="Close">✕</button>
    <div id="bc-form-wrap">
      <div class="bc-title">Book a Call</div>
      <div class="bc-sub">Grab time with Matthew to talk through the platform, partnership, or anything else.</div>
      <form id="bc-form" onsubmit="submitBookCall(event)">
        <input type="text" name="website" class="bc-hp" tabindex="-1" autocomplete="off" />
        <div class="bc-field">
          <label class="bc-label" for="bc-name">Name</label>
          <input class="bc-input" type="text" id="bc-name" name="name" required />
        </div>
        <div class="bc-field">
          <label class="bc-label" for="bc-email">Email</label>
          <input class="bc-input" type="email" id="bc-email" name="email" required />
        </div>
        <div class="bc-field">
          <label class="bc-label" for="bc-time">Preferred Date &amp; Time</label>
          <input class="bc-input" type="datetime-local" id="bc-time" name="preferredTime" required />
        </div>
        <button type="submit" class="bc-submit" id="bc-submit-btn">Request Call</button>
        <div class="bc-msg error" id="bc-error" style="display:none;"></div>
      </form>
    </div>
    <div id="bc-success" style="display:none;">
      <div class="bc-title">You're all set 🎉</div>
      <div class="bc-msg">Thanks for getting in touch! Matthew will reach out to confirm your meeting within 24 hours. Thanks for Lisnin!</div>
    </div>
  </div>
</div>

<script>
function toggleTheme() {
  var html = document.documentElement;
  var isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? '' : 'dark');
  localStorage.setItem('biz-theme', isDark ? 'light' : 'dark');
}

function openBookCall() {
  document.getElementById('bc-overlay').classList.add('open');
}
function closeBookCall() {
  document.getElementById('bc-overlay').classList.remove('open');
}

async function submitBookCall(e) {
  e.preventDefault();
  var form = document.getElementById('bc-form');
  var btn = document.getElementById('bc-submit-btn');
  var errorEl = document.getElementById('bc-error');
  errorEl.style.display = 'none';

  var data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    preferredTime: form.preferredTime.value,
    website: form.website.value,
    source: "Industry One-Sheet",
    sourcePath: "lisnin.io/ataglance",
  };

  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    var res = await fetch('/api/book-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Request failed');

    document.getElementById('bc-form-wrap').style.display = 'none';
    document.getElementById('bc-success').style.display = 'block';
  } catch (err) {
    errorEl.textContent = "Something went wrong — please email matthew@lisnin.io directly.";
    errorEl.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Request Call';
  }
}
</script>
<script type="module">
import * as THREE from 'https://esm.sh/three@0.184.0';
import { GLTFLoader } from 'https://esm.sh/three@0.184.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://esm.sh/three@0.184.0/examples/jsm/loaders/DRACOLoader.js';

(function () {
  var canvas = document.getElementById('logo3d-canvas');
  if (!canvas) return;

  var width = canvas.clientWidth || 200;
  var height = canvas.clientHeight || 34;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);

  var worldWidth = 4.4;
  var worldHeight = worldWidth * (height / width);
  var camera = new THREE.OrthographicCamera(-worldWidth / 2, worldWidth / 2, worldHeight / 2, -worldHeight / 2, 0.1, 100);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  var scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  var pl1 = new THREE.PointLight(0xffffff, 0.5); pl1.position.set(-2, 1.5, 3); scene.add(pl1);
  var pl3 = new THREE.PointLight(0xffffff, 0.9); pl3.position.set(0, 0, 4); scene.add(pl3);

  var draco = new DRACOLoader();
  draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  var loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  var material = new THREE.MeshStandardMaterial({
    color: '#000000',
    metalness: 0.15,
    roughness: 0.4,
  });

  function applyTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    material.color.set(isDark ? '#ffffff' : '#000000');
  }

  loader.load('/models/lisnin-logo-3d.glb', function (gltf) {
    var model = gltf.scene;
    var box = new THREE.Box3().setFromObject(model);
    var center = box.getCenter(new THREE.Vector3());
    model.traverse(function (o) { if (o.isMesh) o.material = material; });

    var group = new THREE.Group();
    model.position.set(-center.x, -center.y, -center.z);
    group.add(model);
    scene.add(group);
    applyTheme();

    var wrap = document.getElementById('logo3d-wrap');
    if (wrap) wrap.classList.add('logo3d-ready');

    var start = performance.now();
    function animate() {
      var t = (performance.now() - start) / 1000;
      group.rotation.y = Math.sin(t * 0.4) * 0.18;
      group.rotation.x = Math.sin(t * 0.3) * 0.04;
      group.position.y = Math.sin(t * 0.6) * 0.015;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  });

  var themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
</script>
</body>
</html>`;

export async function GET() {
  return new NextResponse(HTML, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
