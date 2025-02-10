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
        <div className="text-base dark:text-neutral-200 text-neutral-700">
          Software engineer. Designer. Amateur chef.
          <br />{" "}
          <span className="text-sm dark:text-neutral-300 text-neutral-700">
            you can write anything here!
          </span>
        </div>
        <div className="text-sm dark:text-neutral-300 text-neutral-700">
          inquiries? shoot me an email at nat @ natalie dot sh
        </div>
        <div className="text-3xl dark:text-neutral-400 text-neutral-700 flex gap-2 mt-2">
          <Link href="https://github.com/espeon" target="_blank">
            <FaGithub className="hover:text-wisteria-700 dark:hover:text-wisteria-200 transition-colors duration-200" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/nataliebridgers/"
            target="_blank"
          >
            <FaLinkedin className="hover:text-wisteria-700 dark:hover:text-wisteria-200 transition-colors duration-200" />
          </Link>
          <Link href="https://bsky.app/profile/natalie.sh" target="_blank">
            <svg
              className="h-auto w-7 pt-[0.187rem] hover:text-wisteria-700 dark:hover:text-wisteria-200 transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 568 501"
            >
              <title>Bluesky butterfly logo</title>
              <path
                fill="currentColor"
                d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z"
              ></path>
            </svg>
          </Link>
          <Link href="https://last.fm/user/kanb" target="_blank">
            <FaLastfm className="hover:text-wisteria-700 dark:hover:text-wisteria-200 transition-colors duration-200" />
          </Link>
          <Link href="https://nat.vg/discord" target="_blank">
            <FaDiscord className="hover:text-wisteria-700 dark:hover:text-wisteria-200 transition-colors duration-200" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
