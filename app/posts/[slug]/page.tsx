// app/posts/[slug]/page.tsx
import Header from "app/components/header";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import MDX from "app/components/mdx";
import TimeAgo from "app/components/timeago";
import { PiEyeClosed, PiWarning } from "react-icons/pi";
import { NotPublicHover } from "app/components/notPublicHover";

export async function generateMetadata({ params }): Promise<any | undefined> {
  const post = allPosts.find((post) => {
    return post._raw.flattenedPath === params.slug;
  });
  if (!post) {
    return;
  }

  const { title, datePublished, summary: description } = post;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: datePublished,
      url: `blog.natalie.sh/posts/${post._raw.flattenedPath}`,
      images: [
        {
          url: `https://ogimage-workers.kanbaru.workers.dev/?title=${title}&liner=${description}&date=${format(parseISO(post.datePublished), "MMM. dd, yyyy")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((post) => {
    console.log(post._raw.flattenedPath);
    return post._raw.flattenedPath === params.slug;
  });

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <div className={`mx-auto w-full max-w-prose py-8`}>
      <Header />
      <h1 className="text-3xl mb-2 max-w-md inline">
        {post.public ? "" : <NotPublicHover />}
        {post.title}
      </h1>
      <div className="text-md my-2 dark:text-gray-100 text-gray-800">
        With {post.coAuthors.join(", ")}
      </div>
      <div className="text-sm mb-8 dark:text-gray-100 text-gray-800">
        {format(parseISO(post.datePublished), "MMM. dd, yyyy")}
        <span className="dark:text-gray-400 text-gray-700">
          {" "}
          - <TimeAgo date={post.datePublished} />
        </span>
        <div className="text-sm mb-8 dark:text-gray-400 text-gray-700">
          {post.lastUpdated && (
            <>
              {" "}
              Last updated {format(
                parseISO(post.lastUpdated),
                "MMM. dd, yyyy",
              )}{" "}
              - <TimeAgo date={post.lastUpdated} parentheses={false} />.
            </>
          )}
        </div>
      </div>
      <MDX code={post.body.code} />
    </div>
  );
}
