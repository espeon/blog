"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function HeaderLink(props: {
  href: string;
  label: string | JSX.Element;
  alsoMatch?: string[];
}) {
  const pathname = usePathname();
  const match = () => {
    if (props.href == "/") {
      return props.href === pathname;
    }
    if (props.alsoMatch)
      return props.alsoMatch.some((alsoMatch) =>
        pathname.startsWith(alsoMatch),
      );
    return pathname.startsWith(props.href) || props.href === pathname;
  };
  const isActive = match();
  return (
    <Link
      href={props.href}
      className={clsx(
        isActive && "bg-neutral-400/75 dark:bg-neutral-900/55",
        "relative overflow-hidden bg-neutral-300/55 dark:bg-neutral-800/55 border border-neutral-400/75 dark:border-neutral-700/75 py-1 px-2 md:px-4 rounded-full",
        "hover:bg-neutral-300 dark:hover:bg-neutral-900",
        "transition-colors duration-300 hover:text-black dark:hover:text-white z-0",
        "group", // Add this to create a parent group for hover effects
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 bg-gradient-to-br from-[#f0abfc]/95 via-[#c084fc]/15 to-[#a5b4fc]/35 dark:from-[#4a044e] dark:via-[#020617]/45 dark:to-[#1e1b4b]",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-0",
        )}
      >
        <div className="flex items-center justify-center h-full">
          {props.label}
        </div>
      </span>

      <span className="z-10 transition-colors duration-0">{props.label}</span>
    </Link>
  );
}
