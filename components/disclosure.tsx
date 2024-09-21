"use client";
import { Disclosure } from "@headlessui/react";
import { FaChevronCircleUp, FaChevronUp } from "react-icons/fa";
import { PiTagChevron } from "react-icons/pi";

const MyDisc = () => {
  return (
    <div className="w-full">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`z-100 flex justify-start w-full text-2xl ${
                open ? "-ml-8" : ""
              }`}
            >
              <div
                className={`${
                  open ? "transform rotate-180" : ""
                } transition-transform duration-300`}
              >
                <FaChevronUp
                  className={`${
                    open
                      ? "transform rotate-180 w-8 h-5 opacity-60 pt-2"
                      : " w-0 h-5 rotate-180 opacity-0"
                  } dark:text-white text-gray-700 transition-opacity duration-300`}
                />
              </div>
              <span className={`text-lg opacity-${open ? 60 : 75}`}>
                psst... you want more?{" "}
                <span className="font-semibold text-purple-700 hover:text-blue-300 dark:text-purple-400">
                  click here
                </span>
              </span>
            </Disclosure.Button>
            <div className="-mt-3 pt-2 text-base font-extralight min-w-full mb-16 duration-150">
              <div
                className={`transition-all duration-300 pb-2 ${
                  open ? "visible opacity-100 translate-y-3" : "h-0 opacity-0 select-none"
                }`}
              >
                sure. well,{" "}
              </div>
              <div
                className={`transition-all pb-2 ${
                  open
                    ? "visible opacity-100 translate-y-3 delay-700 duration-300"
                    : "h-0 opacity-0 delay-0 duration-0 select-none"
                }`}
              >
                in my free time i like to{" "}
                <span className="font-semibold">draw</span>,{" "}
                <span className="font-semibold">play video games</span>, and{" "}
                <span className="font-semibold">listen to music</span>.
              </div>
              <div
                className={`transition-all pb-2 ${
                  open
                    ? "visible opacity-100 translate-y-3 delay-1000 duration-300"
                    : "h-0 opacity-0 delay-0 duration-0 select-none"
                }`}
              >
                i'm quite the fan of pokemon, and i also like rhythm games like
                osu! and beat saber. i also like to play a lot of indie games.
                i've actually tried many times to make my own game, but i've
                never been able to get it off the ground.
              </div>
              <div
                className={`transition-all pb-2 ${
                  open
                    ? "visible opacity-100 translate-y-3 delay-[1100ms] duration-300"
                    : "h-0 opacity-0 delay-0 duration-0 select-none"
                }`}
              >
                as for media other than music, i'm a big fan of anime, manga,
                and asian dramas.
              </div>
              <div
                className={`transition-all pb-2 ${
                  open
                    ? "visible opacity-100 translate-y-3 delay-[1150ms] duration-300"
                    : "h-0 opacity-0 delay-0 duration-0 select-none"
                }`}
              >
                i've also been trying to learn chinese. i'm not very good at it,
                but i guess i'm in good company, along with a surprising amount of
                second generation chinese-americans.
              </div>
              <div
                className={`transition-all pb-2 ${
                  open
                    ? "visible opacity-100 translate-y-3 delay-[1200ms] duration-300"
                    : "h-0 opacity-0 delay-0 duration-0 select-none"
                }`}
              >
                if you haven't seen the footer yet, i've also put my recently
                listened on last.fm there. you can also click it to go to my
                last.fm profile.
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default MyDisc;
