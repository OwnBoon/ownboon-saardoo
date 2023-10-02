import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
  children
}: any) =>
  isPlaying && activeSong?.title === song.title ? (
    // <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
    <div className="h-fit w-fit" onClick={handlePause}>
      {children}

    </div>
  ) : (
    // <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
    <div className="h-fit w-fit" onClick={handlePlay}>
      {children}

    </div>
  );

export default PlayPause;
