import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle so the Docker image ships only the
  // files the server actually needs instead of the whole node_modules tree.
  output: "standalone",
  async headers() {
    // Baseline security headers Vercel/Next don't set by default. CSP is
    // intentionally omitted here — /i/bizintro loads three.js as ES modules
    // directly from esm.sh plus a Google Fonts @import, and getting a CSP
    // right for that without regressing the 3D scenes needs dedicated
    // testing rather than a drive-by addition during an SEO pass.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
