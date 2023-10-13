import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setActiveSong, setIsPlaying } from "../redux/features/playerSlice";
import Error from "./../components/Error";
import { selectGenreListId } from "../../../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../../../redux/services/shazamCore";
import { genres } from "../../../assets/constants";
import Loader from "./../components/Loader";
import SongCard from "./../components/SongCard";
import Draggable, { DraggableCore } from "react-draggable";
import { Collapse } from "@nextui-org/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state: any) => state.player);
  const { genreListId } = useSelector((state: any) => state.player);
  const [songClosed, setSongClosed] = useState(true);
  // const { isPlaying } = useSelector((state: any) => state.player);

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "314028736"
  );

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const _data = data.tracks;
  const filteredSongs = _data?.filter(
    (song: any) => song.hub?.actions && song.hub?.actions?.length === 2
  );

  const play = "opacity-100 transition-all duration-2000 btn ease-in-out mr-4";

  return (
    <div className=" items-center md:items-baseline h-full overflow-y-hidden w-full -mt-1 md:left-32 md:top-28 md:absolute flex flex-col overflow-x-hidden">
      <Draggable cancel=".btn">
        <div className="flex justify-between btn items-center sm:flex-row flex-col -mt-4 mb-10 md:mt-0">
          <select
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
            value={genreListId || "544711374"}
            className="bg-black btn text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          >
            {genres.map((genre) => (
              <option className="btn" key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
      </Draggable>

      <Draggable cancel=".btn">
        <div
          className={`flex left-20 ${
            songClosed ? "md:h-1/2" : "md:w-fit"
          }   sm:justify-start w-fit bg-white bg-opacity-30  rounded-[5px] border border-white border-opacity-50 backdrop-blur-[30px] scrollbar-none  overflow-x-hidden justify-center gap-8 `}
        >
          <div className="flex h-fit w-fit scrollbar-none scrollbar flex-col items-start overflow-x-hidden">
            <div className="px-4 py-3 cursor-pointer w-full ">
              <div className="flex justify-between w-full">
                <h1 className="text-white font-sans text-base font-semibold">
                  Currently Playing
                </h1>
                <div>
                  {songClosed ? (
                    <MinusIcon
                      onClick={() => setSongClosed(false)}
                      className="h-6 w-6 text-neutral-200 cursor-pointer "
                    />
                  ) : (
                    <PlusIcon
                      onClick={() => setSongClosed(true)}
                      className="h-6 w-6 cursor-pointer text-neutral-200 "
                    />
                  )}
                </div>
              </div>
              <div className="w-10 h-[0px] border border-neutral-200"></div>
              <div>
                <div className="flex py-3 gap-5">
                  <img
                    className="w-[50px] h-[50px] rounded-lg"
                    src={activeSong.images?.coverart}
                  />
                  <div>
                    <h1 className="text-white  text-base  font-[400] font-sans">
                      {activeSong.title}
                    </h1>
                    <h2 className="text-neutral-200 text-sm font-[400] font-sans">
                      {activeSong.subtitle}
                    </h2>
                  </div>
                </div>
              </div>
              {songClosed ? (
                <div>
                  <h1 className="text-white font-sans mt-2 text-base font-semibold">
                    Other Songs
                  </h1>
                  <div className="w-10 h-[0px] border border-neutral-200"></div>
                </div>
              ) : null}
            </div>
            {songClosed ? (
              <>
                {filteredSongs?.map((song: any, i: any) => (
                  <div
                    className={play}
                    key={i}
                    style={{
                      display: "flex",
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
              </>
            ) : null}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Discover;
