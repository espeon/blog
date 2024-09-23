import Card from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { LuLink } from "react-icons/lu";

export default function Projects() {
  return (
    <div className="h-full w-screen max-w-full md:col-span-5 md:row-span-4 flex flex-col items-left justify-center md:grid md:grid-cols-4 gap-4">
      <ProjectCard
        title="Natalie's Blog"
        tech="Next.js, TailwindCSS, MDX, React, TypeScript"
        description="A fast, minimal, MDX-based blog and homepage.\nThis site!"
        links={[
          {
            link: "https://github.com/espeon/blog",
            linkText: "GitHub",
            LinkIcon: FaGithub,
          },
        ]}
      />
      <ProjectCard
        title="Muse"
        tech="Next.js, React, TypeScript, Bun, Rust"
        description="A fast, beautiful, self-hosted, personal music service."
        links={[
          {
            link: "https://github.com/espeon/muse",
            linkText: "GitHub",
            LinkIcon: FaGithub,
          },
        ]}
      />
      <ProjectCard
        title="Lupin"
        tech="Remix, React, TypeScript"
        description="A Remix based network Looking Glass (provides routing and network info from the perspective of a remote router or network)"
        links={[
          {
            link: "https://github.com/espeon/lupin",
            linkText: "GitHub",
            LinkIcon: FaGithub,
          },
        ]}
      />
      <ProjectCard
        title="Midori"
        tech="Rust, Bento4, SQLite, FFmpeg"
        description="A Rust-based video transcoding and segmenting pipeline"
        links={[
          {
            link: "https://github.com/espeon/midori",
            linkText: "GitHub",
            LinkIcon: FaGithub,
          },
        ]}
      />
      <ProjectCard
        title="Oshiro"
        tech="Rust, Twilight, Discord (platform)"
        description="A Discord bot built with the Twilight library. Made primarily to experiment with building a flexible and modular bot command handler."
        links={[
          {
            link: "https://github.com/espeon/oshiro",
            linkText: "GitHub",
            LinkIcon: FaGithub,
          },
        ]}
      />
      <ProjectCard
        title="TwPal"
        tech="React, TypeScript TailwindCSS"
        description="An easy TailwindCSS palette generator website. Palettes are relatively accurate to Tailwind's defaults."
        links={[
          {
            link: "https://twpal.pages.dev",
            linkText: "Website",
          },
          {
            link: "https://github.com/espeon/twcss-palettegen",
            linkText: "GitHub",
            LinkIcon: FaGithub,
          },
        ]}
      />
    </div>
  );
}

interface ProjectCardLink {
  link: string;
  LinkIcon?: IconType;
  linkText?: string;
}

interface ProjectCardProps {
  imageUrl?: string;
  title: string;
  tech: string;
  description: string;
  links: ProjectCardLink[];
}

function ProjectCard({
  imageUrl,
  title,
  tech,
  description,
  links,
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
          <div className="mb-1" key={i + line}>
            {line}
          </div>
        ))}
      </div>
      <div>
        <div className="text-sm dark:text-wisteria-400 text-wisteria-700 -mb-2 mt-1">
          {links.map((link, i) => {
            const LinkIcon = link.LinkIcon ?? LuLink;
            return (
              <a
                href={link.link}
                target="_blank"
                className="pr-4 align-text-bottom"
                key={i + link.link}
              >
                <LinkIcon className="inline mb-1 mr-1 text-lg" />{" "}
                {link.linkText ? link.linkText : link.link}
              </a>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
