import Link from "next/link";
import { ColorToggle } from "./colortoggle";
import { PiMusicNoteSimpleFill } from "react-icons/pi";
import LastFm from "./lastfm";

export default function Footer(props) {
  return (
    <main
      className={`min-w-full max-w-prose flex flex-row pb-4 items-baseline ${
        props.className ?? ""
      }`}
      {...props}
    >
      <Link
        href="https://last.fm/user/kanb"
        className="flex-grow flex flex-row place-items-center"
      >
        <div className="flex items-center justify-center w-10 h-10 p-3">
          <PiMusicNoteSimpleFill />
        </div>
        <div className="w-fit max-w-xl text-xl">
        <LastFm />
        </div>
      </Link>
      <ColorToggle />
    </main>
  );
}
