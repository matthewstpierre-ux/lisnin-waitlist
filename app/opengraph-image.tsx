import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Lisnin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card: the wordmark on the brand ground, nothing else. Competitors in
 * this space all use a bare logo card, and it survives every crop ratio the
 * social platforms apply.
 */
export default async function Image() {
  const logo = await readFile(
    path.join(process.cwd(), "public", "lisnin-logo__black.svg")
  );
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F6F5F2",
          position: "relative",
        }}
      >
        {/* The same forest-green bloom the site opens with. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1100,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(28,110,61,0.13) 0%, rgba(28,110,61,0) 70%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Lisnin" width={760} height={111} />
      </div>
    ),
    { ...size }
  );
}
