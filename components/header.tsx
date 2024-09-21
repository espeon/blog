import Link from "next/link";
import { ColorToggle } from "./colortoggle";
import clsx from "clsx";
import { HTMLAttributes } from "react";

export default function Header(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "md:col-span-8 transition-all duration-500",
        props.className,
      )}
      {...props}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-2">
          <Link
            href="/"
            className="bg-neutral-200/75 dark:bg-neutral-900/55 border border-neutral-200/75 dark:border-neutral-700/75 py-1 px-4 rounded-full"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="bg-neutral-200/25 dark:bg-neutral-800/55 border border-neutral-200/75 dark:border-neutral-700/75 py-1 px-4 rounded-full"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="bg-neutral-200/25 dark:bg-neutral-800/55 border border-neutral-200/75 dark:border-neutral-700/75 py-1 px-4 rounded-full"
          >
            Blog
          </Link>
        </div>
        <ColorToggle />
      </div>
    </div>
  );
}
