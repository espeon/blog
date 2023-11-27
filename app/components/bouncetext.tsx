"use client";
import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  useAnimation,
} from "framer-motion";
import dynamic from "next/dynamic";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

// @refresh reset

import { useMemo, useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

function useDimensions(ref) {
  const dimensions = useSyncExternalStore(subscribe, () =>
    JSON.stringify({
      width: ref.current?.offsetWidth ?? 0, // 0 is default width
      height: ref.current?.offsetHeight ?? 0, // 0 is default height
      offsetWidth: ref.current?.scrollWidth ?? 0, // 0 is default width
      coverWidth: ref.current?.scrollWidth - ref.current?.offsetWidth ?? 0, // 0 is default width
    })
  );
  return useMemo(() => JSON.parse(dimensions), [dimensions]);
}

const BounceText = ({ text }) => {
  const componentRef = useRef<HTMLDivElement>();
  const { width, coverWidth, offsetWidth, height } =
    useDimensions(componentRef);
  // Create a custom animation controller
  const controls = useAnimation();

  // Define the animation sequence
  const sequence = async () => {
    console.log("widthToCover", coverWidth > 0);
    if (coverWidth > 0) {
      console.log("set to scroll");
      await controls.start({
        x: [0, -coverWidth - 5],
        transition: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: coverWidth * 0.05,
          ease: "easeInOut",
          // pause for a bit
          delay: 1,
        },
      });
    } else {
      console.log("set to default");
      // set to default
      controls.set({
        x: [0, 0],
      });
      controls.stop();
    }
  };

  // Start the animation sequence on mount
  useEffect(() => {
    sequence();
    console.log("resized", width, coverWidth);
  }, [width, height, offsetWidth]);

  return (
    <div>
      <div
        ref={componentRef}
        // h
        style={{
          overflowX: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <motion.h1 animate={controls}>{text}</motion.h1>
      </div>
    </div>
  );
};

const BounceTextDynamic = dynamic(() => Promise.resolve(BounceText), {
    ssr: false,
    });

export default BounceTextDynamic;
