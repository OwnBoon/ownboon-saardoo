import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

import "../../Clock/clock.css";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: any) => (
  <div className="flex items-center justify-around gap-4 md:w-36 lg:w-96 2xl:w-80">
    <div className="bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100">
      <BsArrowRepeat
        size={20}
        color={repeat ? "red" : "white"}
        onClick={() => setRepeat((prev: any) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
    </div>
    {currentSongs?.length && (
      <div className="bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100">
        <MdSkipPrevious
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handlePrevSong}
        />
      </div>
    )}
    {isPlaying ? (
      <div className="bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100">
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      </div>
    ) : (
      <div className="bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100">
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      </div>
    )}
    {currentSongs?.length && (
      <div className="bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100">
        <MdSkipNext
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handleNextSong}
        />
      </div>
    )}
    <div className="bg-white cursor-pointer hover:bg-opacity-20 transition-all duration-100 active:scale-105 bg-opacity-30 p-4 rounded backdrop-blur-lg opacity-100">
      <BsShuffle
        size={20}
        color={shuffle ? "red" : "white"}
        onClick={() => setShuffle((prev: any) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
    </div>
  </div>
);

export default Controls;
