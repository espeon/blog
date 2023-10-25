import Link from "next/link";

export default function Header(props) {
    return (
      <main className={`w-full flex flex-row pb-8 items-baseline ${props.className??""}`} {...props} >
        <div className="flex-grow text-3xl"><Link href={"/"}>natalie blog</Link></div>
        <div className="text-xl"> home</div>
      </main>
    )
  }
  