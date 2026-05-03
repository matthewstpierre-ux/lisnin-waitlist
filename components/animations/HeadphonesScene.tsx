"use client";

import { useEffect, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeadphonesCanvas = dynamic(() => import("./HeadphonesCanvas"), { ssr: false });

const USE_GLB = true;

export function HeadphonesScene() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (prefersReducedMotion || !mounted) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <HeadphonesCanvas useGlb={USE_GLB} />
    </div>
  );
}
