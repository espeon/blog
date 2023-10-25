import { useMDXComponent } from "next-contentlayer/hooks";

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
