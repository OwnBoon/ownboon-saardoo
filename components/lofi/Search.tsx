import React from "react";
import { useSelector } from "react-redux";

import { useGetSongsBySearchQuery } from "../../services/shazamCore";
import Loader from "./components/Loader";
import Error from "./components/Error";
import SongCard from "./components/SongCard";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const searchTerm = router.query.searchTerm;
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits.map((song: any) => song.track);

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song: any, i: any) => (
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

export default Search;
