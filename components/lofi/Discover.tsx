import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Error from "./components/Error";
import { selectGenreListId } from "../../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../../redux/services/shazamCore";
import { genres } from "../../assets/constants";
import Loader from "./components/Loader";
import SongCard from "./components/SongCard";
const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state: any) => state.player);
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "556054389"
  );

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(
    ({ value }: any) => value === genreListId
  )?.title;

  // console.log(genreTitle);

  const newdata = data.tracks;
  const play = "opacity-100 transition-all duration-300";
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "544711374"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {newdata?.map((song: any, i: any) => (
          <div
            className={
              isPlaying ? "opacity-0 transition-all duration-300" : play
            }
          >
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
