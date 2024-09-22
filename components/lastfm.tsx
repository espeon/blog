"use client";
import useSWR from "swr";
import { ScrollingText } from "./scrollingText";
import { CrossFade } from "react-crossfade-simple";
import Link from "next/link";
import { useEffect } from "react";
import Ambilight from "./ambilight";
import { FaLastfm } from "react-icons/fa";
import { LuFileWarning } from "react-icons/lu";

interface Track {
  name: string;
  artist: string;
  imageUrl: string;
  isCurrent: boolean;
}

const FM_KEY = "6f5ff9d828991a85bd78449a85548586";
const MAIN = "kanb";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let recentTrack = data?.recenttracks.track[0];
      console.log(recentTrack);
      return {
        name: recentTrack.name,
        artist: recentTrack.artist["#text"],
        imageUrl: recentTrack.image[recentTrack.image.length - 1]["#text"],
        isCurrent: recentTrack["@attr"]?.nowplaying == "true",
      };
    });

const LastFm: React.FC = () => {
  const { data, error } = useSWR(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${MAIN}&api_key=${FM_KEY}&limit=1&format=json`,
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
      revalidateOnFocus: false, // Disable revalidation on window focus
    },
  );

  // on data, log data
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <CrossFade contentKey={data?.name + data?.artist + data?.imageUrl}>
      {data ? (
        <div className="flex flex-row items-center justify-left w-screen h-full max-w-full">
          <Ambilight />
          <div className="h-24">
            {data.imageUrl ===
            "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png" ? (
              <div className="flex flex-col items-center justify-center text-center text-sm text-gray-700 dark:text-gray-400 mr-4 w-24 h-24 self-center contain-content rounded-lg margin-auto ambilight bg-pink-500/30 z-20 border border-gray-300/20 dark:border-neutral-600/30">
                <LuFileWarning className="text-2xl mb-1" />
                <p>No cover found!</p>
              </div>
            ) : (
              <img
                src={data.imageUrl}
                alt="cover"
                className="mr-4 max-w-24 max-h-24 self-center contain-content rounded-lg margin-auto ambilight z-20 border border-gray-300/20 dark:border-neutral-600/30"
              />
            )}
          </div>
          <div className="flex flex-col items-left justify-center w-min leading-normal max-w-[calc(95%-6rem)]">
            <div className="text-sm dark:text-gray-400 text-gray-600 text-left w-max">
              {data.isCurrent ? "Now Playing" : "Last Played"} on{" "}
              <Link href={`https://www.last.fm/user/${MAIN}`} target="_blank">
                <FaLastfm className="inline text-base mb-0.5 hover:text-wisteria-500 dark:hover:text-wisteria-200 transition-colors duration-150" />
              </Link>
            </div>
            <Link
              href={`https://www.last.fm/music/${data.artist}/_/${data.name}`}
              target="_blank"
            >
              <ScrollingText
                className="hover:text-wisteria-500 dark:hover:text-wisteria-200 transition-colors duration-150"
                text={`${data.name}`}
              />
            </Link>
            <Link
              href={`https://www.last.fm/music/${data.artist}/`}
              target="_blank"
            >
              <ScrollingText
                className="hover:text-wisteria-500 dark:hover:text-wisteria-200 transition-colors duration-150"
                text={`${data.artist}`}
              />
            </Link>
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center w-min max-w-[calc(95%-8rem)]">
          <div className="text-sm text-gray-400 text-left">{error.message}</div>
        </div>
      ) : (
        <div className="h-24 flex flex-col items-center justify-center">
          <div className="text-sm text-gray-400">Loading...</div>
          <noscript>
            <div className="text-sm text-gray-400">
              You'll need to enable JavaScript to view this content.
            </div>
          </noscript>
        </div>
      )}
    </CrossFade>
  );
};
export default LastFm;
