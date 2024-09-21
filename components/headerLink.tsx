"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function HeaderLink(props: {
  href: string;
  label: string;
  alsoMatch?: string[];
}) {
  const pathname = usePathname();
  const match = () => {
    console.log(pathname, props.href);
    if (props.href == "/") {
      console.log("match");
      return props.href === pathname;
    }
    if (props.alsoMatch)
      return props.alsoMatch.some((alsoMatch) =>
        pathname.startsWith(alsoMatch),
      );
    return pathname.startsWith(props.href) || props.href === pathname;
  };
  const isActive = match();
  console.log(pathname, props.href, isActive);
  return (
    <Link
      href={props.href}
      className={clsx(
        isActive && "bg-neutral-200/75 dark:bg-neutral-900/55",
        "bg-neutral-200/25 dark:bg-neutral-800/55 border border-neutral-200/75 dark:border-neutral-700/75 py-1 px-4 rounded-full",
      )}
    >
      {props.label}
    </Link>
  );
}
