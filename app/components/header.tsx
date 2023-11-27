import Link from "next/link";
import { ColorToggle } from "./colortoggle";

export default function Header(props) {
    return (
      <main className={`w-full flex flex-row pb-8 items-baseline ${props.className??""}`} {...props} >
        <div className="flex-grow text-3xl"><Link href={"/"}>natalie</Link></div>
        <div className="text-xl"><Link href={"/blog/"}>blog</Link></div>
        <ColorToggle/>
      </main>
    )
  }
  