"use client";
import { useTheme } from "next-themes";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const other = (theme) => {
  if (theme === "dark") {
    return "light";
  } else if (theme === "light") {
    return "dark";
  }
};

export const ColorToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const DarkLightIcon = isDark ? IoMdMoon : IoMdSunny;
  return (
    // tailwindcss button
    <div
      className="flex items-center justify-center w-10 h-10 p-3 ml-4 rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
      onClick={(_) => setTheme(other(theme))}
      aria-label="toggle theme"
    >
      <DarkLightIcon />
    </div>
  );
};
