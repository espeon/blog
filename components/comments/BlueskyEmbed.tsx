import React, { useState } from "react";
import {
  AppBskyEmbedRecord,
  AppBskyFeedPost,
  AppBskyEmbedExternal,
  Brand,
  AppBskyEmbedImages,
} from "@atcute/client/lexicons";
import { LuX } from "react-icons/lu";

type BlueskyPost = AppBskyFeedPost.Record;
type BlueskyExternalEmbed = Brand.Union<AppBskyEmbedExternal.View>;

// type that has a $type field
type Records = { $type: string };

const BlueskyEmbed = ({
  embed,
  did,
}: {
  embed: BlueskyPost["embed"];
  did: string;
}) => {
  return (
    <div className="rounded-lg border border-neutral-500/50 mb-3 max-w-96">
      {embed.$type === "app.bsky.embed.external" ? (
        <div className="flex flex-col items-left justify-center p-2">
          {embed.external.thumb && (
            <img
              src={getBlueskyCdnLink(
                did,
                embed.external.thumb.ref.$link,
                "jpeg",
              )}
              alt={embed.external.title}
              className="rounded-lg mb-2"
            />
          )}
          <h3 className="font-bold">{embed.external.title}</h3>
          <p className="text-gray-600 text-sm">{embed.external.description}</p>
        </div>
      ) : embed.$type === "app.bsky.embed.images" ? (
        <div className="flex flex-col items-center justify-center">
          <MultiImageLayout did={did} images={embed.images} />
        </div>
      ) : (
        <div className="border rounded-lg p-3 mb-3 max-w-64">
          This embed type ({embed.$type}) is not yet implemented.
        </div>
      )}
    </div>
  );
};

export default BlueskyEmbed;

const getBlueskyCdnLink = (did: string, cid: string, ext: string) => {
  return `https://cdn.bsky.app/img/feed_fullsize/plain/${did}/${cid}@${ext}`;
};

const MultiImageLayout = ({
  did,
  images,
}: {
  did: string;
  images: AppBskyEmbedImages.Image[];
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const imageCount = images.length;

  // Different grid layouts based on number of images
  const gridClassName =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-2",
      4: "grid-cols-2",
    }[Math.min(imageCount, 4)] || "grid-cols-2";

  return (
    <>
      <div className={`grid ${gridClassName} gap-2 w-full`}>
        {images.map((image, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-lg cursor-pointer ${
              imageCount === 3 && i === 0 ? "col-span-2" : ""
            }`}
            onClick={() => setSelectedImage(i)}
          >
            <img
              src={getBlueskyCdnLink(did, image.image.ref.$link, "jpeg")}
              alt=""
              className="w-full h-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105 max-h-64"
              style={{
                aspectRatio: imageCount === 1 ? "" : "1/1",
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <>
          {/* Image Preview */}
          <div
            className="fixed inset-0 bg-black/80 flex flex-col gap-2 items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={getBlueskyCdnLink(
                did,
                images[selectedImage].image.ref.$link,
                "png",
              )}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            {images[selectedImage].alt && (
              <div className="text-white">
                Alt text: {images[selectedImage].alt}
              </div>
            )}
          </div>
          <div className="fixed top-2 right-2 z-50">
            <button
              className="text-blue-100 hover:text-red-400 transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <LuX />
            </button>
          </div>
        </>
      )}
    </>
  );
};
