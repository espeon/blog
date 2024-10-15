import Header from "@/components/header";

// app/page.tsx
import Link from "next/link";
import { PrettyImage } from "@/components/mdx";
import LastFm from "@/components/lastfm";
import Card from "@/components/ui/card";
import { FaDiscord, FaGithub, FaLastfm, FaLinkedin } from "react-icons/fa";
import CurrentTime from "@/components/time/currentTime";
import ProfileCard from "@/components/profileCard";

export default function Page() {
  return (
    <div className="h-full md:col-span-5 md:row-span-3 flex flex-col md:grid md:grid-cols-5 gap-4 items-left justify-center">
      <Card className="max-w-full max-h-full w-screen dark:text-neutral-400 text-neutral-700 md:col-span-5 md:row-span-2">
        <div className="text-xl mb-1 font-semibold text-wisteria-800 dark:text-wisteria-200">
          Who am I?
        </div>
        <p className="mb-2 leading-snug">
          I'm a recent college grad, with a major in Computer Science. In my
          free time, I like to make fast things to solve cool problems.
        </p>
        <p className="leading-snug">
          Outside of coding, I spend my time creating and listening to music,
          going to concerts, reading, or experimenting in the kitchen. You’ll
          often find me working on my homelab, listening to music, or hanging
          out with friends.
        </p>
      </Card>
      <Card className="text-lg max-w-full py-2 w-screen md:col-span-3 md:row-span-1">
        <LastFm />
      </Card>
      <Card className="p-0 text-lg w-screen max-w-full dark:bg-wisteria-300/55 flex flex-col justify-center items-center md:col-span-2 md:row-span-1">
        <div className="flex flex-col h-full justify-center items-center text-wisteria-700 dark:text-wisteria-200 text-base">
          <noscript>
            <div className="text-xs text-gray-400">
              You'll need to enable JavaScript to view this.
            </div>
          </noscript>
          <CurrentTime className="text-xl" />
          in Nashville, TN
        </div>
      </Card>
    </div>
  );
}
