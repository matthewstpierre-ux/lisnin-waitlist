import { NextResponse } from "next/server";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Lisnin.io — Investor One-Pager</title>

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
  /* light mode: ☀ side is active */
  .t-light { color: var(--green-light); background: var(--green-glow); }
  .t-dark  { color: var(--muted); background: transparent; }
  /* dark mode: ☽ side is active */
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
  .logo-light-img { display: block; height: 34px; width: auto; }
  .logo-dark-img  { display: none;  height: 34px; width: auto; }
  [data-theme="dark"] .logo-light-img { display: none; }
  [data-theme="dark"] .logo-dark-img  { display: block; }

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
    max-width: 320px;
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
    font-size: 30px;
    font-weight: 900;
    letter-spacing: -0.04em;
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

  /* ── TWO / THREE COL ────────────────────────────── */
  .two-col   { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px; }

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

  /* ── FLYWHEEL ───────────────────────────────────── */
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
  .fly-arrow {
    display: none;
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

  /* ── MARKETPLACE PROOF ──────────────────────────── */
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

  /* ── MILESTONE ──────────────────────────────────── */
  .milestone {
    background: var(--grad-gtm);
    border: 1px solid var(--green-border);
    border-radius: 8px;
    padding: 14px 16px;
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .milestone-big {
    font-size: 24px;
    font-weight: 900;
    color: var(--green-light);
    letter-spacing: -0.03em;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .milestone-txt {
    font-family: 'Epilogue', sans-serif;
    font-size: 10.5px;
    color: var(--muted);
    line-height: 1.5;
  }
  .milestone-txt strong { color: var(--text); font-family: 'Outfit', sans-serif; font-weight: 700; }

  /* ── FINANCIALS ─────────────────────────────────── */
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

  /* ── PENETRATION NOTE ───────────────────────────── */
  .pen-note {
    font-family: 'Epilogue', sans-serif;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.6;
    margin-top: 10px;
  }
  .pen-note strong { color: var(--green-light); font-family: 'Outfit', sans-serif; font-weight: 700; }

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

  /* ── MOBILE ─────────────────────────────────────── */
  @media (max-width: 660px) {
    .page { padding: 32px 18px 56px; }

    .header { flex-direction: column; gap: 16px; }
    .header-right { align-items: flex-start; width: 100%; }
    .header-ask { text-align: left; }
    .logo-light-img, .logo-dark-img { height: 28px; }
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

    .two-col, .three-col { grid-template-columns: 1fr; gap: 12px; }

    .case-row { flex-direction: column; align-items: flex-start; gap: 2px; }
    .case-buyers { text-align: left; }

    .milestone { flex-direction: column; align-items: flex-start; gap: 8px; }

    .metric-row { flex-direction: column; gap: 1px; align-items: flex-start; }
    .metric-value { text-align: left; }

    .cta { flex-direction: column; gap: 18px; padding: 22px 20px; }
    .cta-right { text-align: left; }
    .cta-headline { font-size: 15px; }
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

    .three-col { grid-template-columns: 1fr 1fr; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="logo-block">
      <img src="/lisnin-logo__black.svg" alt="Lisnin" class="logo-light-img" />
      <img src="/lisnin-logo__white.svg" alt="Lisnin" class="logo-dark-img" />
      <div class="tagline">Your Entire Music Career, One Platform</div>
      <div class="subtag">The SaaS wedge into the capital market for independent music.</div>
    </div>
    <div class="header-right">
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle light/dark mode">
        <span class="t-opt t-light">☀ Light</span>
        <span class="t-opt t-dark">☽ Dark</span>
      </button>
      <div class="header-ask">
        <div class="ask-label">Pre-Seed Ask</div>
        <div class="ask-amount">$250K USD</div>
        <div class="ask-note">SAFE Note · $2.75M Post-Money Cap · September 2026 Launch<br/>matthew@lisnin.io · lisnin.io · CBCA Corp., Milton, ON</div>
      </div>
    </div>
  </div>

  <!-- STAT STRIP -->
  <div class="hero-bar">
    <div class="hero-stat">
      <div class="hs-label">Community</div>
      <div class="hs-value">80K+</div>
      <div class="hs-sub">Owned community · $0-CPA channel</div>
    </div>
    <div class="hero-stat">
      <div class="hs-label">Pre-Product</div>
      <div class="hs-value green">$200K+</div>
      <div class="hs-sub">Transacted for artists</div>
    </div>
    <div class="hero-stat">
      <div class="hs-label">Breakeven</div>
      <div class="hs-value">Month 7–8</div>
      <div class="hs-sub">~1,140 subscribers</div>
    </div>
    <div class="hero-stat">
      <div class="hs-label">LTV : CAC</div>
      <div class="hs-value green">5.3–9.4×</div>
      <div class="hs-sub">Stress-tested at 5–9% churn</div>
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

  <!-- PROBLEM / SOLUTION -->
  <div class="section-title">The Opportunity</div>
  <div class="ps-wrap">
    <div class="ps-side problem">
      <div class="ps-eyebrow prob">The Problem</div>
      <div class="ps-head">5–7 disconnected tools. One artist paying for all of them.</div>
      <div class="ps-body">36% of all music released is now fully independent, yet no single platform serves the complete career stack. Artists spend $400–500/yr on tools that never talk to each other — while $1B+ in publishing royalties goes unclaimed annually and no platform offers a path to fan capital.</div>
    </div>
    <div class="ps-side solution">
      <div class="ps-eyebrow sol">The Solution</div>
      <div class="ps-head">Lisnin replaces the stack with one subscription — from $50/yr.</div>
      <div class="ps-body">150+ DSP distribution (0% commission, Dolby Atmos standard) · US + CA publishing admin · Earkitz website builder · 4,000+ industry contacts · Listening Party Bot · and a Rights Marketplace (Phase 2) where artists raise capital from fans.</div>
    </div>
  </div>

  <!-- FLYWHEEL -->
  <div class="section-title">The Flywheel</div>
  <div class="card flywheel-card">
    <div class="card-head">Distribution Is The Funnel. The Marketplace Is The Business.</div>
    <div class="fly">
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">01</span>DISTRIBUTE</div>
        <div class="fly-body">Releases go live on 150+ DSPs through the $50/yr wedge.</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">02</span>VERIFY</div>
        <div class="fly-body">Streaming &amp; royalty data accrues natively on-platform.</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">03</span>LIST</div>
        <div class="fly-body">Verified data underwrites invite-only marketplace listings.</div>
      </div>
      <div class="fly-step">
        <div class="fly-head"><span class="fly-num">04</span>RAISE</div>
        <div class="fly-body">Fans buy fractional rights. Artists get capital. Lisnin earns 10% of GMV.</div>
      </div>
    </div>
    <div class="fly-quote">
      &ldquo;Artists won&rsquo;t switch distributors to save $10 a year. They&rsquo;ll switch for access to capital.&rdquo;
      <span class="muted-inline">Eligibility requires distributing on Lisnin; capital-raising artists pull peers off incumbents.</span>
    </div>
  </div>

  <!-- PROOF / TRACTION -->
  <div class="section-title">Proof &amp; Traction</div>
  <div class="two-col">
    <div class="card">
      <div class="card-eyebrow">Marketplace Proof — Run Manually, Three Times</div>
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
      <div class="case-total"><b>$200K+ raised across all campaigns</b> — real dollars, real buyers, zero paid acquisition. Royal.io&rsquo;s 2024 exit vacated the category; Lisnin re-enters on Web2/Stripe rails with a proven buyer pool (Month 16).</div>
    </div>
    <div class="card">
      <div class="card-eyebrow">Traction &amp; Validation</div>
      <div class="info-list">
        <div class="info-item"><div class="info-dot"></div><strong>Top 10 of 10,000+</strong> — Solana Grizzlython (Listening Party prototype)</div>
        <div class="info-item"><div class="info-dot"></div><strong>24 Earkitz sites sold pre-platform</strong> at $250 each — $6K revenue before launch</div>
        <div class="info-item"><div class="info-dot"></div><strong>Partners:</strong> Eveara (150+ DSPs) · Ajna Inc. (13+ engineers) · Wracket ($3.4M sync budgets)</div>
        <div class="info-item"><div class="info-dot"></div><strong>Former Songtrust VP advising</strong> on publishing ops &amp; competitive strategy (confidential)</div>
        <div class="info-item"><div class="info-dot"></div><strong>Accepted</strong> — Spring:Build accelerator</div>
      </div>
    </div>
  </div>

  <!-- GTM / FINANCIALS -->
  <div class="section-title">Go-To-Market &amp; Financials</div>
  <div class="two-col">
    <div class="card">
      <div class="card-eyebrow">Go-To-Market</div>
      <div class="info-list">
        <div class="info-item"><div class="info-dot"></div><strong>Community (LLC):</strong> $0 CPA · 80K warm audience · 40–60 subs/mo</div>
        <div class="info-item"><div class="info-dot"></div><strong>Paid social &amp; search:</strong> $27 blended CPA · 225–260 subs/mo at full deploy</div>
        <div class="info-item"><div class="info-dot"></div><strong>Influencer (Yr 2):</strong> $4.20 CAC · 6.4× better efficiency vs. paid</div>
        <div class="info-item"><div class="info-dot"></div><strong>Ambassadors:</strong> 10% recurring commission on referred subscriptions</div>
      </div>
      <div class="milestone">
        <div class="milestone-big">~$47K</div>
        <div class="milestone-txt"><strong>Launch Milestone #1:</strong> 236 founding waitlist subscribers × $199 billed at launch against ~$5K spend (9.4×) — conservative CPA math; organic conversion is upside. We publish the result either way.</div>
      </div>
    </div>
    <div class="card green-bg">
      <div class="card-eyebrow">Financial Highlights (24-Month Model)</div>
      <div class="metric-row"><div class="metric-label">Blended ARPU</div><div class="metric-value green">$153/yr</div></div>
      <div class="metric-row"><div class="metric-label">Blended paid CAC</div><div class="metric-value">$27</div></div>
      <div class="metric-row"><div class="metric-label">LTV:CAC — stress-tested (9% / 7% / 5% churn)</div><div class="metric-value green">5.3× / 6.7× / 9.4×</div></div>
      <div class="metric-row"><div class="metric-label">Year 1 revenue → exit ARR run-rate</div><div class="metric-value">~$175–195K → ~$350K</div></div>
      <div class="metric-row"><div class="metric-label">Year 2 ARR + marketplace GMV</div><div class="metric-value green">~$1.0–1.1M + ~$380K</div></div>
      <div class="metric-row"><div class="metric-label">Year 2 EBITDA</div><div class="metric-value green">+$300–380K</div></div>
      <div class="metric-row"><div class="metric-label">Breakeven</div><div class="metric-value">Month 7–8 · ~1,140 subs</div></div>
      <div class="metric-note">Six streams: subscriptions · publishing commissions (12–13% net via partner) · directory add-on · Listening Party (25% token share) · B2B seats · marketplace (10% GMV).</div>
    </div>
  </div>

  <!-- MARKET / WHY WE WIN -->
  <div class="section-title">Market &amp; Why We Win</div>
  <div class="two-col">
    <div class="card">
      <div class="card-eyebrow">Market — Sized Bottom-Up From Artists Who Already Pay</div>
      <div class="metric-row"><div class="metric-label">People who have uploaded music to Spotify</div><div class="metric-value">13M</div></div>
      <div class="metric-row"><div class="metric-label">Independent artists in North America</div><div class="metric-value">8.2M</div></div>
      <div class="metric-row"><div class="metric-label">Artists already paying DistroKid $23–40/yr</div><div class="metric-value">2M+</div></div>
      <div class="metric-row"><div class="metric-label">Professional &amp; aspiring-pro artists globally (Spotify est.)</div><div class="metric-value">~250K</div></div>
      <div class="pen-note"><strong>Penetration math:</strong> the entire Year-2 target of 6,000 subscribers is <strong>0.3% of artists already paying for distribution alone</strong> — while Lisnin replaces a $400–500/yr stack from $50/yr. Rights investment adds a $5B+/yr pool growing 12%+.</div>
    </div>
    <div class="card dark">
      <div class="card-eyebrow">Why Lisnin Wins</div>
      <div class="info-list">
        <div class="info-item"><div class="info-dot"></div><strong>80K pre-built community</strong> — 4 years of trust and $200K+ transacted; can&rsquo;t be replicated with money</div>
        <div class="info-item"><div class="info-dot"></div><strong>No rival bundles</strong> distribution + pub admin + contacts + website builder + community in one</div>
        <div class="info-item"><div class="info-dot"></div><strong>Asset-light publishing ops</strong> — registration pipeline via established partner; nets 12–13% now, internalizes to full 15% at scale</div>
        <div class="info-item"><div class="info-dot"></div><strong>Aligned sync incentive</strong> — registered catalog → DISCO library → Wracket&rsquo;s $3.4M supervisor budgets</div>
        <div class="info-item"><div class="info-dot"></div><strong>Distribution lock-in</strong> — catalogs live on 150+ DSPs make leaving costly; Winamp (Euronext: ALWIN) validated the model in the EU at 500+ signups/day — the NA seat is open</div>
      </div>
    </div>
  </div>

  <!-- TEAM -->
  <div class="section-title">The Team</div>
  <div class="three-col">
    <div class="team-card">
      <div class="team-initials">MS</div>
      <div class="team-name">Matthew St. Pierre</div>
      <div class="team-role">CEO &amp; Co-Founder · 51%<br/>(+3.5% advisor pool held in trust)</div>
      <div class="team-bio">8+ yrs across label founding, artist development, sync biz dev &amp; web3 launches. Built the Lonely Listeners Club to 80K+ over 4 years, facilitating $200K+ raised for artists.</div>
    </div>
    <div class="team-card">
      <div class="team-initials">VS</div>
      <div class="team-name">Vinay Singh</div>
      <div class="team-role">CTO &amp; Co-Founder · 33%</div>
      <div class="team-bio">Founder of Ajna Inc. — a 13+ engineer product studio. Deep SaaS architecture; brings a full development team to the cap table, cutting build cost and technical risk from Day 1.</div>
    </div>
    <div class="team-card">
      <div class="team-initials">EL</div>
      <div class="team-name">Everton Lewis Jr.</div>
      <div class="team-role">Partnerships &amp; Artist Relations · 12.5%</div>
      <div class="team-bio">Founder of Wracket Music Supervision ($3.4M+ annual sync budgets); prev. Vice, Apple. Deep licensing and label relationships — priority placement access from launch day.</div>
    </div>
  </div>

  <!-- CTA -->
  <div class="cta">
    <div>
      <div class="cta-headline">Ready to see the full picture?</div>
      <div class="cta-sub">Full pitch deck, 24-month financial model, product demo &amp; data room on request</div>
    </div>
    <div class="cta-right">
      <a href="mailto:matthew@lisnin.io" class="cta-email" style="text-decoration:none;">matthew@lisnin.io</a>
      <div class="cta-url">lisnin.io · $250K USD · $2.75M Post-Money SAFE Cap · September 2026 launch</div>
    </div>
  </div>

  <!-- DOWNLOAD -->
  <div class="download-bar">
    <a href="/Lisnin_OneSheet_v2.pdf" download="Lisnin One-Sheet.pdf" class="download-btn">
      ↓ Download PDF
    </a>
  </div>

</div>

<script>
function toggleTheme() {
  var html = document.documentElement;
  var isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? '' : 'dark');
  localStorage.setItem('biz-theme', isDark ? 'light' : 'dark');
}
</script>
</body>
</html>`;

export async function GET() {
  return new NextResponse(HTML, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
