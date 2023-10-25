import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";

/// internal link component, mostly to open in new page on click
/// stolen from https://github.com/leerob/leerob.io/blob/main/app/components/mdx.tsx
function InternalLink(props: { href: string; children: React.ReactNode }) {
  let href = props.href;
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/// pretty next/image wrapper with rounded edges and an optional caption
function PrettyImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className={`${!caption ?? "shadow-sm shadow-slate-800"}`}>
      <img
        src={src}
        alt={alt}
        className={` shadow-xl shadow-slate-800 ${caption ? "rounded-t-lg" : "rounded-lg"}`}
      />
      {caption && (
        <div className="bg-[rgb(28,28,28)] border-[rgb(51,51,51)] border-[1px] mx-0 pt-1 pb-4 px-4 rounded-b-lg shadow-xl shadow-[rgb(22,22,22)]">
          <figcaption className="text- text-gray-200">{caption}</figcaption>
        </div>
      )}
    </figure>
  );
}

const components = {
  a: InternalLink,
  Image: PrettyImage,
};

export default function MDX({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);
  return (
    <div className="prose dark:prose-invert">
      <MDXContent components={components} />
    </div>
  );
}
