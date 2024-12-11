import React from "react";

import {
  AppBskyFeedDefs,
  Brand,
  AppBskyFeedPost,
} from "@atcute/client/lexicons";
import Link from "next/link";
import { LuHeart, LuRecycle, LuRedo, LuReply } from "react-icons/lu";

type ThreadView = Brand.Union<AppBskyFeedDefs.ThreadViewPost>;
type BlueskyPost = AppBskyFeedPost.Record;

function isPost(post: any): post is BlueskyPost {
  return post.$type === "app.bsky.feed.post";
}

export interface BlueskyReplyProps {
  thread: ThreadView;
  depth?: number;
}

const BlueskyReply = ({ thread, depth = 0 }: BlueskyReplyProps) => {
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
            <span>{bskyPost.text}</span>
          </div>
        </div>

        {/* Embed Section */}
        {embed && embed.external && (
          <div className="border rounded-lg p-3 mb-3 max-w-96">
            {embed.external.thumb && (
              <img
                src={embed.external.thumb}
                alt={embed.external.title}
                className="w-full h-full object-cover rounded-lg mb-2"
              />
            )}
            <h3 className="font-bold">{embed.external.title}</h3>
            <p className="text-gray-600 text-sm">
              {embed.external.description}
            </p>
          </div>
        )}

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
        </div>
      </div>

      {/* Nested Replies */}
      {depth < MAX_DEPTH && replies && replies.length > 0 && (
        <div className="nested-replies">
          {/* is a reply a ThreadView? */}
          {replies
            .filter((r) => r.$type === "app.bsky.feed.defs#threadViewPost")
            .map((nestedReply, index) => (
              <BlueskyReply
                key={`${nestedReply.post.uri}-${index}`}
                thread={nestedReply}
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
