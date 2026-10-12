import type { Metadata } from "next";
import BizIntro from "@/components/bizintro/BizIntro";

export const metadata: Metadata = {
  title: "Lisnin — Pre-seed",
  description:
    "An entire music career, run by one agent. Pre-seed $250K USD, $2.75M post-money cap, launching December 2026.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BizIntro />;
}
