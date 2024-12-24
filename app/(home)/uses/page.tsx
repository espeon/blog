import TimeAgo from "@/components/timeago";
import Card from "@/components/ui/card";
import { FaCode, FaGithub } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { LuClock, LuLink } from "react-icons/lu";

export default function Projects() {
  return (
    <div className="h-full w-screen max-w-full md:col-span-5 md:row-span-4 flex flex-col items-left justify-center md:grid md:grid-cols-2 gap-4 pb-16">
      <Card className="text-lg w-screen max-w-full dark:bg-wisteria-300/55 flex flex-col items-left justify-between md:col-span-2">
        <div className="p-4">
          <h1 className="text-4xl">/uses</h1>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Inspired by{" "}
            <a
              href="https://wesbos.com/uses"
              target="_blank"
              className="text-wisteria-500 dark:text-wisteria-300 underline"
            >
              Wes Bos' /uses
            </a>
            . Find more <a href="https://uses.tech">/uses here</a>.
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <LuClock className="inline-block w-5 h-5 mr-2 mb-1" />
            <span className="mt-3">
              Last updated <TimeAgo date={"12-23-2024"} parentheses={false} />
            </span>
          </div>
          <div className="text-base mt-2">
            <p>
              I use a variety of tools and services to make my life easier. I'm
              always looking for new ways to improve my workflow, so if you have
              any suggestions or recommendations, please let me know!
            </p>
            <p className="mt-2">
              Anyways, this should be a pretty comprehensive list of the tools I
              use often.
            </p>
          </div>
          <h1 className="text-3xl mt-4">Editor + Terminal</h1>
          <div className="text-base h-full mt-2">
            <ul className="space-y-1 list-disc list-outside ml-4 dark:text-gray-200">
              <li>
                I commonly use{" "}
                <a
                  href="https://code.visualstudio.com/"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  VSCode
                </a>{" "}
                , but I'm leaning on{" "}
                <a
                  href="https://zed.dev/"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Zed
                </a>{" "}
                more, because I find it significantly faster to use.
              </li>
              <li>
                I use{" "}
                <a
                  href="https://github.com/catppuccin/catppuccin"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Catpuccin Mocha
                </a>{" "}
                everywhere I can, including VSCode, Zed, and Spotify!
              </li>
              <li>
                My font of choice is{" "}
                <a href="https://github.com/iaolo/iA-Fonts">iA Writer Mono</a>{" "}
                (or the Nerd Font variant, iMWriting Mono).
              </li>
              <li>
                For my terminal, I mainly use iTerm2 on macOS, but occasionally
                I may use the Windows Terminal or Alacritty.
              </li>
              <li>
                On my terminal, I generally use zsh with oh-my-zsh + my Paramour
                theme.
              </li>
            </ul>
            <h2 className="text-3xl mt-4">Desktop Apps</h2>
            <ul className="space-y-1 list-disc list-outside ml-4  dark:text-gray-200 mt-2">
              <li>
                I use{" "}
                <a
                  href="https://arc.net"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Arc
                </a>{" "}
                but I'm in the process of switching to{" "}
                <a
                  href="https://zen-browser.app/"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Zen
                </a>{" "}
                for "privacy" reasons.
              </li>
              <li>
                I use{" "}
                <a
                  href="https://www.affine.pro"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Affine
                </a>{" "}
                for my personal wiki and note-taking.
              </li>
              <li>
                I use{" "}
                <a
                  href="https://www.figma.com/"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Figma
                </a>{" "}
                or{" "}
                <a
                  href="https://www.penpot.app"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  PenPot
                </a>{" "}
                for my design projects.
              </li>
            </ul>
            <h2 className="text-3xl mt-4">Desk Setup</h2>
            <ul className="space-y-1 list-disc list-outside ml-4  dark:text-gray-200  mt-2">
              <li>
                For my monitors, I use a LG UltraGear 34GP63A-B (1440p,
                ultrawide, VA panel :p) and a UltraGear 27GL83A-B (1440p, IPS
                :D).
              </li>
              <li>
                I have a little KVM switcher setup for my MacBook Pro and
                Windows Desktop computers, so I can switch my whole setup
                between them instantly.
              </li>
              <li>
                I use{" "}
                <a
                  href="https://www.logitech.com/en-us/products/mice/mice-for-computers/mx-ergo-wireless-mouse.html"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  MX Master 3
                </a>{" "}
                for my work mouse, and a{" "}
                <a
                  href="https://www.logitechg.com/en-us/products/gaming-mice/pro-x-superlight-wireless-mouse.html"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Logitech G Pro X Superlight
                </a>{" "}
                for my gaming mouse.
              </li>
              <li>
                I use a{" "}
                <a
                  href="https://www.zsa.io/en/products/keyboards/moolander"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  ZSA Moonlander
                </a>{" "}
                for my work keyboard, but I also have a{" "}
                <a
                  href="https://drop.com/buy/drop-alt-v2-mechanical-keyboard"
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                >
                  Massdrop ALT
                </a>
                .
              </li>
            </ul>
            <h2 className="text-3xl mt-4">Computer</h2>
            <ul className="space-y-1 list-disc list-outside ml-4  dark:text-gray-200 mt-2">
              <li>
                My laptop is a{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://www.apple.com/macbook-pro-14-and-16/"
                >
                  MacBook Pro 14" M1 Pro (8+2 core)
                </a>
              </li>
              <li>
                My desktop currently is a{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://www.amd.com/en/products/cpu/amd-ryzen-5-3600x"
                >
                  Ryzen 5 3600X (8 core)
                </a>{" "}
                + 16GB ram +{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4070-family/"
                >
                  RTX 4070ti Super (16GB)
                </a>{" "}
                with the{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://nzxt.com/product/h440"
                >
                  NZXT H440 (USB-C)
                </a>
                .
              </li>
              <li>
                My homelab PCs are a pair of{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://www.lenovo.com/us/en/p/desktops/thinkcentre/m-series-tiny/11tc1mtm7g2/11jn002qus"
                >
                  Lenovo ThinkCentre M75Qs
                </a>{" "}
                (Ryzen 5 PRO 4650GE, 32GB ram), plus 2x12TB shucked drives in a
                JBOD.
              </li>
              <li>
                I dockerize everything I can, homelab-wise. Routing is done with
                docker-compose tags with Traefik.
              </li>
            </ul>
            <h2 className="text-3xl mt-4">Audio</h2>
            <ul className="space-y-1 list-disc list-outside ml-4 dark:text-gray-200 mt-2">
              <li>
                My main headphones are the{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://drop.com/buy/massdrop-sennheiser-hd6xx"
                >
                  Massdrop HD6XX
                </a>
                , powered straight from my{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://audient.com/products/audio-interfaces/id14/"
                >
                  Audient iD14 audio interface
                </a>
                .
              </li>
              <li>
                My speakers are the excellently priced{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://www.energy-speakers.com/products/reference-connoisseur/"
                >
                  Energy Reference Connoisseur series RC-10
                </a>
                , powered by my Emotiva TA-100 audio interface, and the sub I
                use is an Emotiva BASx S8 subwoofer.
              </li>
              <li>
                On the go, I use a pair of{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://www.apple.com/airpods-pro/"
                >
                  AirPods Pro 2
                </a>
                , but if I want good audio, I switch between a{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://shenzhenaudio.com/products/moondrop-x-crinacle-blessing2-dusk-1dd-4ba-in-ear-monitor-earphone"
                >
                  Moondrop Blessing 2 Dusk
                </a>{" "}
                or my{" "}
                <a
                  target="_blank"
                  className="text-wisteria-500 dark:text-wisteria-300 underline"
                  href="https://www.symphoniumaudio.com/products/meteor"
                >
                  Symphonium Meteors
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
