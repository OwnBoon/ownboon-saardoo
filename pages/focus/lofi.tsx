import React, { useEffect, useState } from "react";
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
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // @ts-ignore
    setStartTime(new Date());

    const handleRouteChange = () => {
      // @ts-ignore
      setEndTime(new Date());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      const timeSpentInSeconds = Math.floor((endTime! - startTime!) / 1000);
      const pointsEarned = calculatePoints(timeSpentInSeconds);
      console.log(
        `User spent ${timeSpentInSeconds} seconds on this page and earned ${pointsEarned} points.`
      );
    };
  }, []);

  const calculatePoints = (timeSpentInSeconds: number) => {
    const pointsPerSecond = 0.01; // change this value to adjust point earning rate
    const earnedPoints = Math.floor(timeSpentInSeconds * pointsPerSecond);
    setPoints(earnedPoints);
    return earnedPoints;
  };

  useEffect(() => {
    if (endTime) {
      const timeSpentInSeconds = Math.floor((endTime - startTime!) / 1000);
      setTimeSpent(timeSpentInSeconds);
      const earnedPoints = calculatePoints(timeSpentInSeconds);
      console.log(
        `User earned ${earnedPoints} points for spending ${timeSpentInSeconds} seconds on this page.`
      );
    }
  }, [endTime]);

  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="relative flex lofi">
      <div className="z-30 hidden md:inline-flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col \ ">
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
