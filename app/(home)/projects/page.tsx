import Card from "@/components/ui/card";
import { IconType } from "react-icons/lib";
import { LuLink } from "react-icons/lu";

export default function Projects() {
  return (
    <div className="h-full w-screen max-w-full md:col-span-5 md:row-span-4 flex flex-col items-left justify-center md:grid md:grid-cols-4 md:gap-4">
      <ProjectCard
        title="Natalie's Blog"
        tech="Next.js, TailwindCSS, MDX, React, TypeScript"
        description="A fast, minimal, MDX-based blog and homepage.\nThis site!"
        link="https://github.com/espeon/blog"
      />
      <ProjectCard
        title="Muse"
        tech="Next.js, React, TypeScript, Bun, Rust"
        description="A fast, beautiful, self-hosted, personal music service."
        link="https://github.com/espeon/muse"
      />
      <ProjectCard
        title="Lupin"
        tech="Remix, React, TypeScript"
        description="A Remix based network Looking Glass (provides routing and network info from the perspective of a remote router or network)"
        link="https://github.com/espeon/lupin"
      />
      <ProjectCard
        title="Midori"
        tech="Rust, Bento4, SQLite, FFmpeg"
        description="A Rust-based video transcoding and segmenting pipeline"
        link="https://github.com/espeon/midori"
      />
      <ProjectCard
        title="Oshiro"
        tech="Rust, Twilight, Discord (platform)"
        description="A Discord bot built with the Twilight library. Made primarily to experiment with building a flexible and modular bot command handler."
        link="https://github.com/espeon/oshiro"
      />
    </div>
  );
}

interface ProjectCardProps {
  imageUrl?: string;
  title: string;
  tech: string;
  description: string;
  link: string;
  LinkIcon?: IconType;
  linkText?: string;
}

function ProjectCard({
  imageUrl,
  title,
  tech,
  description,
  link,
  LinkIcon = LuLink,
  linkText,
}: ProjectCardProps) {
  return (
    <Card className="text-lg w-screen max-w-full dark:bg-wisteria-300/55 flex flex-col items-left justify-between md:col-span-2">
      <div className="flex flex-row h-min justify-left gap-2">
        {imageUrl && (
          <img
            src="/tinies.webp"
            alt="{title} logo"
            className="w-16 h-16 rounded-lg"
          />
        )}
        <div className="flex flex-col items-left justify-center">
          <div className="text-xl">{title}</div>
          <div className="text-sm dark:text-neutral-400 text-neutral-700">
            {tech}
          </div>
        </div>
      </div>
      <div className="text-base h-full mt-2">
        {description.split("\\n").map((line, i) => (
          <div className="mb-1" key={i}>
            {line}
          </div>
        ))}
      </div>
      <div>
        <div className="text-sm dark:text-wisteria-400 text-wisteria-700">
          <a href={link} target="_blank">
            <LinkIcon className="inline mb-0.5" /> {linkText ? linkText : link}
          </a>
        </div>
      </div>
    </Card>
  );
}
