import Header from "@/components/header";

// app/page.tsx
import Link from "next/link";
import { PrettyImage } from "@/components/mdx";
import LastFm from "@/components/lastfm";
import Card from "@/components/ui/card";
import { FaDiscord, FaGithub, FaLastfm, FaLinkedin } from "react-icons/fa";
import CurrentTime from "@/components/time/currentTime";
import ProfileCard from "@/components/profileCard";

export default function Page({ children }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-8 items-left justify-center gap-4 mt-4">
      <ProfileCard />
      {children}
    </div>
  );
}
