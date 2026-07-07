"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";

const Logo3DCanvas = dynamic(() => import("./animations/Logo3DCanvas"), { ssr: false });

interface Logo3DProps {
  width: number;
  height: number;
  priority?: boolean;
}

export function Logo3D({ width, height, priority }: Logo3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const fallback = <Logo width={width} height={height} priority={priority} />;

  if (prefersReducedMotion || !mounted) return fallback;

  return (
    <Suspense fallback={fallback}>
      <Logo3DCanvas pixelWidth={width} pixelHeight={height} />
    </Suspense>
  );
}
