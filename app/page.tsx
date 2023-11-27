import Header from "./components/header";

// app/page.tsx
import Link from "next/link";
import { PrettyImage } from "./components/mdx";
import IconRow from "./components/icons";
import HomeDisc from "./components/disclosure";
import BounceText from "./components/bouncetext";

export default function Page() {
  return (
    <div className="max-w-max x-8 py-5 sm:px-6 xl:pt-64 md:pt-32">
      <div className="w-44 pb-4">
        <PrettyImage
          round
          alt="My GitHub profile image"
          src="https://pcdn.nat.vg/crop?width=256&height=256&url=https://avatars.githubusercontent.com/u/22222885"
        />
      </div>
      <h3 className="text-5xl text-gray-900 font-thick dark:text-gray-100 duration-300">
        hey,👋🏼 i'm{" "}
        <span className="bg-gradient-to-tr dark:from-purple-400 dark:via-pink-400 dark:to-slate-500 from-purple-600 via-slate-600 to-pink-600 text-transparent bg-clip-text">
          natalie
        </span>
        .
      </h3>
      <div className="py-4">
        <h4 className="text-2xl font-extralight mb-2">
          i do <span className="font-semibold">cool things</span> with{" "}
          <span className="font-semibold">computers</span> and{" "}
          <span className="font-semibold">the internet.</span>
        </h4>
        <h4 className="text-2xl font-extralight">
          i also have a{" "}
          <Link
            href="/blog"
            className="font-semibold text-purple-700 hover:text-blue-300 dark:text-purple-400"
          >
            blog
          </Link>
          .
        </h4>
      </div>
      <BounceText text="scroll down" />
      <h4 className="text-2xl font-extralight">
        you can also find me here:
        <IconRow />
      </h4>
      <div className="text-2xl font-extralight mt-4">
          <HomeDisc />
        </div>
    </div>
  );
}
