import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lisnin — Your Entire Music Career, One Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1120",
          position: "relative",
        }}
      >
        {/* Green glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(34,197,94,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#F0EDE8",
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Lisnin
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#9CA3AF",
            letterSpacing: "-0.01em",
            textAlign: "center",
            maxWidth: 700,
            marginBottom: 40,
          }}
        >
          Your Entire Music Career, One Platform
        </div>

        {/* Green pill badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: 100,
            padding: "10px 24px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22C55E",
            }}
          />
          <span style={{ color: "#22C55E", fontSize: 18, fontWeight: 600 }}>
            Join the Beta — First month free at launch
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
