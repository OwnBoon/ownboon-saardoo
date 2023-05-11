import React from "react";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../../utils/fetchUsers";
import { User } from "../../typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Sidebar from "../../components/lofi/Sidebar";
import SearchBar from "../../components/lofi/SearchBar";
import TopPlay from "../../components/lofi/TopPlay";
import Discover from "../../components/lofi/Discover";
import ArtistDetails from "../../components/lofi/ArtistDetails";
import SongDetails from "../../components/lofi/SongDetails";
import Search from "../../components/lofi/Search";
import MusicPlayer from "../../components/lofi/MusicPlayer";
interface Props {
  users: User[];
}

const Home = ({ users }: Props) => {
  const { activeSong } = useSelector((state: any) => state.player);

  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="relative flex">
      <div className="z-30 hidden md:inline-flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#E50914] ">
        <div className="sticky top-0 z-50 bg-black/20 ">
          <SearchBar />
          <div className="z-50 sm:inline md:hidden">
            <Sidebar />
          </div>
        </div>

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Discover />
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute z-50 h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl ">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await fetchUsers();

  return {
    props: {
      users,
    },
  };
};
export default Home;
