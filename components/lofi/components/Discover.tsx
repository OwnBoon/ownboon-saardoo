import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Error from "./../components/Error";
import { selectGenreListId } from "../../../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../../../redux/services/shazamCore";
import { genres } from "../../../assets/constants";
import Loader from "./../components/Loader";
import SongCard from "./../components/SongCard";

const Discover = () => {

    const dispatch = useDispatch();
    const { genreListId } = useSelector((state: any) => state.player);
    const { isPlaying } = useSelector((state: any) => state.player);


    const { data, isFetching, error } = useGetSongsByGenreQuery(
        genreListId || "556054389"
    );

    if (isFetching) return <Loader title="Loading songs..." />;

    if (error) return <Error />;


    const _data = data.tracks;
    const filteredSongs = _data?.filter((song: any) => song.hub?.actions && song.hub?.actions?.length === 2);

    const play = "opacity-100 transition-all duration-2000 ease-in-out mr-4";

    return (
        <div className="w-full flex flex-col overflow-hidden overflow-x-hidden">
            {/* <div className="flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
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
            </div> */}

            <div className="flex flex-wrap sm:justify-start w-fit rounded-md overflow-x-hidden justify-center gap-8 bg-white bg-opacity-50 border-white border">
                <div className="flex w-[300px] flex-col items-start overflow-x-hidden">
                    {filteredSongs?.map((song: any, i: any) => (
                        <div
                            className={
                                play
                            }
                            key={i}
                            style={{
                                display: 'flex'
                            }}
                        >
                            <SongCard
                                key={song.key}
                                song={song}
                                isPlaying={isPlaying}
                                activeSong={null}
                                data={data}
                                i={i}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Discover;
