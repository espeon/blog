import Header from "./components/header";

// app/page.tsx
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { timeAgo } from "helpers/helpers";
import { useMDXComponent } from "next-contentlayer/hooks";

const REASONABLE_LENGTH = 160

function PostCard(post: Post) {
  // get first paragraph of post from MDX
  // we use raw, which is separated by \n
  let split = post.body.raw.split('\n')

  // go through each line <= reasonable length and add it to firstParagraph
  let firstParagraph = ''
  for (let i = 0; i < split.length; i++) {
    firstParagraph += " " + split[i]
    if (split[i].length > REASONABLE_LENGTH) break
  }
  
  // strip all markdown formatting from string including links
  firstParagraph = firstParagraph.replace(/[#/\[\]*>]/g, '')
  firstParagraph = firstParagraph.replace(/\(.*?\)/g, '')
  // if longer than reasonable length, then truncate and add ellipsis
  if (firstParagraph.length > REASONABLE_LENGTH) {
    firstParagraph = firstParagraph.substring(0, REASONABLE_LENGTH) + '...'
    // if ends with a space or comma or other punctuation, remove it
    if (firstParagraph.endsWith(" ...") || firstParagraph.endsWith(",...")|| firstParagraph.endsWith("....")) {
      firstParagraph = firstParagraph.substring(0, firstParagraph.length - 4) + '...'
    }
  }
  
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link href={post.url} className="text-blue-700 hover:text-blue-300 dark:text-blue-400">
          {post.title}
        </Link>
      </h2>
      <div className="text-sm mb-2 dark:text-gray-100 text-gray-800">
        {format(parseISO(post.datePublished), 'MMM. dd, yyyy')} <span className="dark:text-gray-400 text-gray-700">({timeAgo(post.datePublished)})</span>
      </div>
      <div className="text-sm mb-2"> {post.summary} </div>
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: firstParagraph }} />
    </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.datePublished), new Date(b.datePublished)))

  return (
    <div className="mx-auto w-full max-w-prose py-8">
      <Header />
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}