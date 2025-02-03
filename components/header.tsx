import Link from "next/link";
import { ColorToggle } from "./colortoggle";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import HeaderLink from "./headerLink";
import { IconButton } from "./ui/iconButton";
import { LuCommand } from "react-icons/lu";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog", alsoMatch: ["/posts"] },
  {
    href: "/projects",
    label: (
      <>
        <div className="hidden md:block">Projects</div>
        <div className="md:hidden">🏗</div>
      </>
    ),
  },
  {
    href: "/guestbook",
    label: (
      <>
        <div className="hidden md:block">Guestbook</div>
        <div className="md:hidden">🪶</div>
      </>
    ),
  },
  {
    href: "/uses",
    label: (
      <>
        <div className="hidden md:block">/uses</div>
        <div className="md:hidden">💻</div>
      </>
    ),
  },
];

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
        <div className="flex gap-1 sm:gap-2">
          {links.map((link) => (
            <HeaderLink key={link.href} {...link} />
          ))}
        </div>
        <div className="flex gap-2">
          <IconButton
            Icon={LuCommand}
            className="hidden text-gray-500 bg-neutral-300 dark:text-gray-500 dark:bg-neutral-700"
            disabled
          />
          <ColorToggle />
        </div>
      </div>
    </div>
  );
}
