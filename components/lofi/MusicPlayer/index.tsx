import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  nextSong,
  prevSong,
  playPause,
} from "../../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

import "../../Clock/clock.css";

//@ts-ignore
const MusicPlayer = ({ sessionStarted }) => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state: any) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    // flex-col items-center justify-center w-3/5 h-full ml-[4vw] md:justify-center md:space-y-32
    <div className="absolute flex flex-col items-center w-3/5 h-full ml-[4vw] md:justify-center md:space-y-32">
      {sessionStarted ? (
        <div className="relative flex items-center justify-center -top-80 -z-40">
          {isPlaying ? (
            <div className="absolute z-10">
              <BsFillPauseFill
                size={65}
                color="#FFF"
                onClick={handlePlayPause}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="absolute z-10">
              <BsFillPlayFill
                size={65}
                color="#FFF"
                onClick={handlePlayPause}
                className="cursor-pointer"
              />
            </div>
          )}

          <div
            className={`w-[212px] h-[212px] absolute bg-white bg-opacity-30 backdrop-blur-3xl border-opacity-50 border-white border text-white rounded-full flex items-center justify-center`}
          >
            <div className="spinner"></div>
          </div>
        </div>
      ) : null}

      <div className="absolute z-50 w-full sm:px-12 px-8 w-full flex flex-col items-center justify-between mr-0">
        {/* <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      /> */}

        <div className="flex-1 flex flex-col items-center justify-center">
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          {/* <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event: any) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        /> */}
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event: any) => setAppTime(event.target.currentTime)}
            onLoadedData={(event: any) => setDuration(event.target.duration)}
          />
        </div>
        {/* <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event: any) => setVolume(event.target.value)}
        setVolume={setVolume}
      /> */}
      </div>
    </div>
  );
};

export default MusicPlayer;
