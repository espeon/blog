'use client'
import React, { useEffect, useState } from 'react';
import BounceText from './bouncetext';

interface Track {
  name: string;
  artist: string;
}

const FM_KEY = "6f5ff9d828991a85bd78449a85548586";
const MAIN = "kanb";

const LastFm: React.FC = () => {
  const [track, setTrack] = useState<Track | null>(null);

useEffect(() => {
    const fetchTrack = () => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${MAIN}&api_key=${FM_KEY}&limit=1&format=json`)
            .then(response => response.json())
            .then(data => {
                const recentTrack = data.recenttracks.track[0];
                setTrack({
                    name: recentTrack.name,
                    artist: recentTrack.artist['#text'],
                });
            })
            .catch(error => console.error(error));
    }

    fetchTrack(); // Fetch immediately on component mount
    const intervalId = setInterval(fetchTrack, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
}, []);

  return (
    <>
      {track ? (
        <>
          <BounceText text={`${track.name.toLowerCase()} - ${track.artist.toLowerCase()}`}/>
        </>
      ) : (
        <p></p>
      )}
      </>
  );
};

export default LastFm;
