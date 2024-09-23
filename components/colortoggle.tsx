"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMdMoon, IoMdRefreshCircle, IoMdSunny } from "react-icons/io";
import { LuMoon, LuSun, LuSunMoon } from "react-icons/lu";
import { IconButton } from "./ui/iconButton";

const other = (theme: string) => {
  if (theme === "dark") {
    return "light";
  } else {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      return systemTheme.matches ? "light" : "dark";
    } else {
      return "dark";
    }
  }
};

export const ColorToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  let isDark: boolean;
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    isDark = systemTheme.matches;
  } else {
    isDark = theme === "dark";
  }
  const DarkLightIcon = mounted ? (isDark ? LuMoon : LuSun) : LuSunMoon;
  return (
    // tailwindcss button
    <IconButton
      className="flex items-center justify-center w-10 h-10 p-3 rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
      aria-label="button"
      Icon={DarkLightIcon}
      onClick={() => {
        setTheme(other(theme));
      }}
    />
  );
};
