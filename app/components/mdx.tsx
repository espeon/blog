import { useMDXComponent } from "next-contentlayer/hooks";

/// pretty img wrapper with rounded edges and an optional caption
export function PrettyImage({
  src,
  alt,
  caption,
  round,
  height,
  width,
}: {
  src: string;
  alt: string;
  caption?: string;
  round?: boolean;
  height?: string;
  width?: string;
}) {
  return (
    <figure className={`${!caption ?? "shadow-sm dark:shadow-slate-800 shadow-slate-200"}`}>
      <img
        src={src}
        alt={alt}
        className={`duration-700 delay-200 shadow-xl dark:shadow-slate-800 shadow-slate-400 ${caption ? "rounded-t-lg" : (round ? "rounded-full" : "rounded-xl")}`}
        height={height}
        width={width}
      />
      {caption && (
        <div className="dark:bg-[rgb(28,28,28)] border-[rgb(51,51,51)] border-[1px] mx-0 pt-1 pb-4 px-4 rounded-b-lg shadow-xl dark:shadow-[rgb(22,22,22)]">
          <figcaption className="text- text-gray-200">{caption}</figcaption>
        </div>
      )}
    </figure>
  );
}

const components = {
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
