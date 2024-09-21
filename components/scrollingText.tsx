"use client";
import clsx from "clsx";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

interface ScrollingTextProps {
  /// Any other class names you need to put inside this component
  className?: string;
  /// The text (or component) to put inside. It should be inline.
  text?: React.ReactNode;
  /// Width on either side to fade in px, if the text wraps around
  fadeWidth?: number;
}

export function ScrollingText({
  text,
  className = "",
  fadeWidth = 8,
  ...props
}: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dupeTextRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [dividerWidth, setDividerWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const calculateOverflow = () => {
    const container = containerRef.current;
    const textElement = textRef.current;
    const dupe = dupeTextRef.current;

    if (container && textElement) {
      let isTextOverflowing: boolean | ((prevState: boolean) => boolean);
      let len: React.SetStateAction<number>;

      if (dupe !== null) {
        isTextOverflowing = textElement.scrollWidth / 2 > container.offsetWidth;
        len = textElement.scrollWidth / 2;
      } else {
        isTextOverflowing = textElement.scrollWidth > container.offsetWidth;
        len = textElement.scrollWidth;
      }

      setIsOverflowing(isTextOverflowing);

      if (isTextOverflowing) {
        setContainerWidth(container.offsetWidth);
        setDividerWidth(dividerRef.current?.offsetWidth ?? 0);
        const duration = len / 60; // Adjust speed here
        setAnimationDuration(duration);
        setTextWidth(len);
      }
    }
  };

  useEffect(() => {
    calculateOverflow();
  }, [text]);

  useEffect(() => {
    window.addEventListener("resize", calculateOverflow);
    return () => window.removeEventListener("resize", calculateOverflow);
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(className, `relative w-full overflow-hidden`)}
      style={
        isOverflowing
          ? ({
              "--leftStop": `${(8 / containerWidth) * 100 + fadeWidth / 2}%`,
              "--rightStop": `calc(100% - var(--leftStop))`,
              maskImage:
                "linear-gradient(to right, transparent 0%, black var(--leftStop), black var(--rightStop), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black var(--leftStop), black var(--rightStop), transparent 100%)", // For WebKit browsers
            } as CSSProperties)
          : {}
      }
    >
      <div
        ref={textRef}
        className={`whitespace-nowrap ${
          isOverflowing ? "animate-scroll-text" : ""
        }`}
        style={
          {
            animationDuration: isOverflowing ? `${animationDuration}s` : "0s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            // the 0.5rem here is based off half the padding in the span below
            // (padding of value 4 is 1rem)
            "--text-width": `calc(${textWidth}px + (32px/2))`,
          } as CSSProperties
        }
      >
        <span>{text}</span>
        {isOverflowing && (
          <>
            <div className="text-center inline-block" ref={dividerRef}>
              ・
            </div>
            <span ref={dupeTextRef}>{text}</span>
          </>
        )}
      </div>
    </div>
  );
}
