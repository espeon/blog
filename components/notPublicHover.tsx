"use client";
import { useRef, useState } from "react";
import { PiEyeClosed, PiEye, PiWarning } from "react-icons/pi";

export const NotPublicHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // 2.5 seconds after mouse leave
    setTimeout(() => {
      setIsHovered(false);
    }, 1500);
  };

  return (
    <div
      ref={hoverRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline mb-2 mt-1 px-1 mr-1 aspect-square relative rounded-full transition-200 transition-colors`}
    >
      <div className={`absolute bottom-8 left-0 w-max text-base p-1 font-mono dark:bg-red-900 bg-red-400 rounded-lg shadow-lg transition-200 transition-all ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <PiWarning className="inline text-2xl mb-0.5 mr-1" />
        This post is not public. Be careful who you share this with.
      </div>
      {isHovered?<PiEye className="inline px-1 mb-1 h-8 w-8 rounded-full bg-slate-900" />:
      <PiEyeClosed className="inline px-1 mb-1 h-8 w-8" />}
    </div>
  );
};
