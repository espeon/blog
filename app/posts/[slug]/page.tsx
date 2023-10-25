// app/posts/[slug]/page.tsx
import Header from "app/components/header";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { timeAgo } from "helpers/helpers";
import MDX from "app/components/mdx";

export async function generateMetadata({
  params,
}): Promise<any | undefined> {
  const post = allPosts.find((post) => {
    return post._raw.flattenedPath === params.slug;
  });
  if (!post) {
    return;
  }

  const {
    title,
    datePublished,
    summary: description,
  } = post;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: datePublished,
      url: `blog.natalie.sh/posts/${post._raw.flattenedPath}`,
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
      <h1 className="text-3xl mb-2 max-w-md">{post.title}</h1>
      <div className="text-sm mb-8 dark:text-gray-100 text-gray-800">
        {format(parseISO(post.datePublished), 'MMM. dd, yyyy')} <span className="dark:text-gray-400 text-gray-700">({timeAgo(post.datePublished)})</span>
      </div>
      <MDX code={post.body.code} />
    </div>
  );
}
