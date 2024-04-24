"use client";
import { useRef, useState } from "react";
import { PiEyeClosed, PiWarning } from "react-icons/pi";

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
      className={`inline ml-4 mt-1 relative ${isHovered ? "dark:bg-slate-900 bg-slate-300" : "hover:dark:bg-slate-900 hover:bg-slate-300"} rounded-lg transition-200 transition-colors`}
    >
      <div className={`absolute bottom-10 right-0 w-56 pl-2 p-1 text-lg dark:bg-red-900 bg-red-400 rounded-lg shadow-lg transition-200 transition-all ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <PiWarning className="inline text-2xl mb-0.5 mr-1" />
        This post is not public.
      </div>
      <PiEyeClosed className="inline mx-4 mb-1" />
    </div>
  );
};
