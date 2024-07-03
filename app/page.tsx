import Header from "./components/header";

// app/page.tsx
import Link from "next/link";
import { PrettyImage } from "./components/mdx";
import IconRow from "./components/icons";
import HomeDisc from "./components/disclosure";
import BounceText from "./components/bouncetext";

export default function Page() {
  return (
    <div className="max-w-fit x-8 py-5 mx-2 pt-12 sm:px-6 xl:pt-64 md:pt-32 duration-150">
      <div className="w-44 mb-4 h-[11rem]">
        <PrettyImage
          round
          alt="My GitHub profile image"
          src="https://pcdn.nat.vg/crop?width=256&height=256&url=https://avatars.githubusercontent.com/u/22222885"
          height="11rem"
        />
      </div>
      <h3 className="text-2xl md:text-5xl text-gray-900 font-thick dark:text-gray-50 duration-75 ">
        hey,👋🏼 i'm{" "}
        <span className="text-transparent bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text duration-150">
          natalie
        </span>
        .
      </h3>
      <div className="py-4 font-extralight text-xl md:text-2xl">
        <h4 className=" inline-block text-pretty">
          i do{" "}
          <span className="font-semibold dark:text-pink-300/80 text-pink-900">
            cool things
          </span>{" "}
          with{" "}
          <span className="font-semibold dark:text-teal-300/80 text-teal-900">
            computers
          </span>{" "}
          and{" "}
          <span className="font-semibold dark:text-purple-200/80 text-purple-900 ">
            the internet.
          </span>
        </h4>
        <h4 className=" mb-2">
          find them{" "}
          <a
            href="https://github.com/espeon"
            className="font-semibold underline text-blue-700/80 dark:text-blue-300/80 hover:text-purple-500 dark:hover:text-blue-300 duration-150"
          >
            here
          </a>
          .
        </h4>
        <h4 className="">
          i also have a{" "}
          <Link
            href="/blog"
            className="font-semibold underline text-blue-700/80 dark:text-blue-300/80 hover:text-purple-500 dark:hover:text-blue-300 duration-150"
          >
            blog
          </Link>
          .
        </h4>
      </div>
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
