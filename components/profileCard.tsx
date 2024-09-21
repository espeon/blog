import Link from "next/link";
import { PrettyImage } from "./mdx";
import Card from "./ui/card";
import { FaGithub, FaLinkedin, FaLastfm, FaDiscord } from "react-icons/fa";

export default function ProfileCard() {
  return (
    <Card className="text-xl md:row-span-3 md:col-span-3 md:p-8">
      <div className="flex flex-col items-left justify-center">
        <PrettyImage
          src="/tinies.webp"
          alt="profile image"
          width="100"
          height="100"
          round={true}
        />
        <div className="text-2xl mt-2 text-wisteria-700 dark:text-wisteria-200">
          Hey, I'm <span className="font-semibold">Natalie.</span>
        </div>
        <div className="text-base dark:text-neutral-300 text-neutral-700">
          Software engineer. Designer. Amateur chef.
          <br />{" "}
          <span className="text-sm dark:text-neutral-400 text-neutral-700">
            you can write anything here!
          </span>
        </div>
        <div className="text-3xl dark:text-neutral-400 text-neutral-700 flex gap-2 mt-2">
          <Link href="https://github.com/espeon" target="_blank">
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/nataliebridgers/"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
          <Link href="https://last.fm/user/kanb" target="_blank">
            <FaLastfm />
          </Link>
          <Link href="https://nat.vg/discord" target="_blank">
            <FaDiscord />
          </Link>
        </div>
        <div className="text-sm dark:text-neutral-400 text-neutral-700 mt-0.5">
          inquiries? shoot me an email at nat @ natalie dot sh
        </div>
      </div>
    </Card>
  );
}
