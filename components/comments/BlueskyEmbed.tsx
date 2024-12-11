import React from "react";
import {
  AppBskyEmbedRecord
  AppBskyFeedPost,
  AppBskyEmbedExternal,
  Brand,
} from "@atcute/client/lexicons";

type BlueskyPost = AppBskyFeedPost.Record;
type BlueskyEmbedRecord = AppBskyEmbedRecord.Record;

// type that has a $type field
type Records = { $type: string };

// pass in a post and a type
function isType(check: any, type: { $type: string }): check is Records {
  return check.$type === type.$type;
}

function isTypeInner<T extends Records>(
  post: any,
  type: { $type: string },
): post is T {
  return post.$type === type.$type;
}

const BlueskyEmbed = ({ embed }: { embed: BlueskyPost["embed"] }) => {
  if (!embed || isType(embed, BlueskyEmbedRecord)) {
    return null;
  }
  return (
    <div className="border rounded-lg p-3 mb-3 max-w-64">
      {embed.external.thumb && (
        <img
          src={embed.external.thumb}
          alt={embed.external.title}
          className="w-full h-40 object-cover rounded-lg mb-2"
        />
      )}
      <h3 className="font-bold">{embed.external.title}</h3>
      <p className="text-gray-600 text-sm">{embed.external.description}</p>
    </div>
  );
};

export default BlueskyEmbed;
