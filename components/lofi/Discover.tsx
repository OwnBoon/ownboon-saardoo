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
    genreListId || ""
  );

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(
    ({ value }: any) => value === genreListId
  )?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song: any, i: any) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
