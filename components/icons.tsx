import { IoLogoTwitch } from "react-icons/io";
import { FaGithub, FaTwitch, FaTwitter, FaDiscord } from "react-icons/fa";

const IconRow = () => {
  let icons = [
    { i: <FaGithub />, url: "https://github.com/espeon" },
    { i: <FaTwitter />, url: "https://twitter.com/ameiwi" },
    { i: <IoLogoTwitch />, url: "https://twitch.tv/ameiwi" },
    { i: <FaDiscord />, url: "https://nat.vg/discord" },
  ];
  return (
    <div className="flex py-2" style={{fontSize:"2rem"}}>
      {icons.map((e) => {
        return (
          <div className="pr-[.25em]" key={e.url}>
            <a href={e.url}>{e.i}</a>
          </div>
        );
      })}
    </div>
  );
};

export default IconRow;