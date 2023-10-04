import React from "react";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import Link from "next/link";

const SongCard = ({ song, isPlaying, activeSong, data, i }: any) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    const filteredSongs = data?.tracks.filter(
      (song: any) => song.hub?.actions && song.hub?.actions?.length === 2
    );
    dispatch(
      setActiveSong({ song, data: { ...data, tracks: filteredSongs }, i })
    );
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-row w-[300px] h-[100px] items-center justify-start gap-3 p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-fit h-[100px] group flex items-center justify-center">
        {/* <div
          className={`absolute justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title
            ? "flex bg-black bg-opacity-70"
            : "hidden"
            }`}
        >

        </div> */}
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        >
          <img
            alt="song_img"
            src={song.images?.coverart}
            className="w-[50px] h-[50px] rounded-lg"
          />
        </PlayPause>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      >
        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-sm text-white truncate">
            <h1>{song.title}</h1>
          </p>
          <p className="text-sm truncate text-gray-300 mt-1">
            <h2 className="font-sans">{song.subtitle}</h2>
          </p>
        </div>
      </PlayPause>
    </div>
  );
};

export default SongCard;
