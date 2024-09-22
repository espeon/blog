import Link from "next/link";
import { ColorToggle } from "./colortoggle";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import HeaderLink from "./headerLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog", alsoMatch: ["/posts"] },
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
        <div className="flex gap-2">
          {links.map((link) => (
            <HeaderLink key={link.href} {...link} />
          ))}
        </div>
        <ColorToggle />
      </div>
    </div>
  );
}
