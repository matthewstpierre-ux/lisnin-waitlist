"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion, useScroll, useTransform, motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeadphonesCanvas = dynamic(() => import("./HeadphonesCanvas"), { ssr: false });

const USE_GLB = true;

export function HeadphonesScene() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  const rotateZ = useTransform(scrollY, [0, 800], [0, -12]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (prefersReducedMotion || !mounted) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, y, rotateZ }}
    >
      <HeadphonesCanvas useGlb={USE_GLB} />
    </motion.div>
  );
}
