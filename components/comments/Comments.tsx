"use client";
import { useEffect, useState } from "react";
import {
  AppBskyFeedGetPostThread,
  AppBskyFeedDefs,
  Brand,
} from "@atcute/client/lexicons";
import BlueskyReply from "./BlueskyReply";

export interface CommentsProps {
  // The DID of the OP
  did: string;
  // The CID of the app.bsky.feed.post
  postCid: string;
}

type ThreadView = Brand.Union<AppBskyFeedDefs.ThreadViewPost>;

function isThreadView(thread: unknown): thread is ThreadView {
  return (thread as ThreadView)?.$type === "app.bsky.feed.defs#threadViewPost";
}

export default function Comments({ did, postCid }: CommentsProps) {
  const [comments, setComments] =
    useState<AppBskyFeedGetPostThread.Output | null>(null);

  useEffect(() => {
    const params: AppBskyFeedGetPostThread.Params = {
      uri: `at://${did}/app.bsky.feed.post/${postCid}`, // Replace with actual AT-URI
      depth: 6, // Optional: how deep to fetch replies (default is 6)
    };
    const searchParams = new URLSearchParams();
    searchParams.append("uri", params.uri);
    if (params.depth !== undefined) {
      searchParams.append("depth", params.depth.toString());
    }
    if (params.parentHeight !== undefined) {
      searchParams.append("parentHeight", params.parentHeight.toString());
    }
    fetch(
      "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?" +
        searchParams,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }, []);

  // if we are loading
  if (!comments) {
    return <div>Loading...</div>;
  }

  // if we have error prop?
  if (!isThreadView(comments?.thread)) {
    return <div>Error: {(comments as any).error}</div>;
  }

  if (isThreadView(comments.thread)) {
    return (
      <div className="w-full min-w-full">
        <BlueskyReply thread={comments.thread} />{" "}
      </div>
    );
  }

  return <div className="text-2xl">Comment count: </div>;
}
