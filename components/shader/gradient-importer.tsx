"use client";
import dynamic from "next/dynamic";

// do not ssr gradientreact
const GradientReact = dynamic(() => import("./gradient"), {
  ssr: false,
});

export default function Gradient() {
  return <GradientReact />;
}
