import React from "react";

import {
  AppBskyFeedDefs,
  Brand,
  AppBskyFeedPost,
  AppBskyEmbedRecord,
} from "@atcute/client/lexicons";
import Link from "next/link";
import {
  LuArrowLeft,
  LuArrowRight,
  LuHeart,
  LuRecycle,
  LuRedo,
  LuReply,
} from "react-icons/lu";

import {} from "react-icons/fa6";

import BlueskyEmbed from "./BlueskyEmbed";
import { PiButterfly, PiButterflyFill } from "react-icons/pi";

type ThreadView = Brand.Union<AppBskyFeedDefs.ThreadViewPost>;
type BlueskyPost = AppBskyFeedPost.Record;

function isPost(post: any): post is BlueskyPost {
  return post.$type === "app.bsky.feed.post";
}

export interface BlueskyReplyProps {
  thread: ThreadView;
  depth?: number;
  skipFirst?: boolean;
}

const BlueskyReply = ({
  thread,
  depth = 0,
  skipFirst = false,
}: BlueskyReplyProps) => {
  if (thread.$type !== "app.bsky.feed.defs#threadViewPost") {
    return null;
  }

  const { post, replies } = thread;
  const { author, embed, replyCount, repostCount, likeCount, record } = post;
  let bskyPost: BlueskyPost;
  if (isPost(record)) {
    bskyPost = record as BlueskyPost;
  }

  // Limit nesting depth to prevent too deep chains
  const MAX_DEPTH = 5;

  // Add visual connector line for nested replies
  const connectorClass =
    depth > 1 ? "border-l border-gray-400 dark:border-gray-800" : "";

  return (
    <div className={`bluesky-reply-chain`} style={{ marginLeft: depth * 16 }}>
      {!skipFirst && (
        <div className={`bluesky-reply my-4 px-4 mb-1 ${connectorClass}`}>
          {/* Author Section */}
          <div className="flex items-center mb-2">
            <img
              src={author.avatar}
              alt={author.displayName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <Link
                className="font-bold"
                href={`https://bsky.app/profile/${author.did}`}
              >
                {author.displayName}
              </Link>
              <div className="text-gray-700 dark:text-gray-400">
                <Link href={`https://bsky.app/profile/${author.did}`}>
                  @{author.handle}
                </Link>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-3">
            <div className="flex gap-2 items-center">
              <span>{bskyPost?.text}</span>
            </div>
          </div>

          {/* Embed Section */}
          {embed && <BlueskyEmbed embed={bskyPost.embed} did={author.did} />}

          {/* Engagement Stats */}
          <div className="flex gap-4 text-gray-700 dark:text-gray-400 text-sm">
            <div className="flex gap-2 items-center">
              <span>{likeCount}</span> <LuHeart />
            </div>
            <div className="flex gap-2 items-center">
              <span>{replyCount}</span> <LuReply />
            </div>
            <div className="flex gap-2 items-center">
              <span>{repostCount}</span> <LuRecycle />
            </div>
            <Link
              href={`https://bsky.app/profile/${author.did}/post/${post.uri.split("/").pop()}`}
              className="flex gap-2 items-center"
            >
              Go to post
              <LuArrowRight />
            </Link>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {depth < MAX_DEPTH && replies && replies.length > 0 && (
        <div className="nested-replies">
          {/* is a reply a ThreadView? */}
          {replies
            .filter((r) => r.$type === "app.bsky.feed.defs#threadViewPost")
            .map((nestedReply, index) => (
              <BlueskyReply
                key={`${(nestedReply as any).post?.uri}-${index}`}
                thread={nestedReply as ThreadView}
                depth={depth + 1}
              />
            ))}
        </div>
      )}

      {/* Show "View more replies" button if depth limit reached */}
      {depth === MAX_DEPTH && replies && replies.length > 0 && (
        <button className="text-blue-500 ml-4 mt-2">
          View more replies...
        </button>
      )}
    </div>
  );
};

export default BlueskyReply;
