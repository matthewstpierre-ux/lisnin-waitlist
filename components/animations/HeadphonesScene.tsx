"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion, useScroll, useTransform, motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeadphonesCanvas = dynamic(() => import("./HeadphonesCanvas"), { ssr: false });

export function HeadphonesScene() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (prefersReducedMotion || !mounted) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      <HeadphonesCanvas />
    </motion.div>
  );
}
