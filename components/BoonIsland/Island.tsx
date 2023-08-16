import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { User } from "../../typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Spline from "@splinetool/react-spline";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
interface Props {
  users: User[],setLoading?: (value: boolean) => void;
}

const Island = ({ users,setLoading }: Props) => {
  
  
  const { isLoaded, isSignedIn, user } = useUser();
  const match = users.filter(
    (usere) => usere.email === user?.emailAddresses[0].emailAddress
  );
  const router = useRouter();

  // const match = users.filter((user) => user.email == session?.user?.email);
  const focus = match[0]?.focus;
  const factor = 0.02;
  const focus_no = Number(focus);
  const level = Math.floor(focus_no! * factor);
  const barlevel = level * 10;
  console.log(level);
  useEffect(() => {
   setTimeout(() => {
    setLoading?setLoading(false) : ""
   }, 8000);
  }, []);
  return (
    <div className="h-[100%] w-full flex relative">
      {user ? (
        <>
          {level < 5 ? (
            <Spline 

            
            
              className=""
              scene="https://prod.spline.design/YXg9FOeBh95j4Z8Q/scene.splinecode"
            />
          ) : level < 10 ? (
            <div>
              <Spline
                className=""
                scene="https://prod.spline.design/YXg9FOeBh95j4Z8Q/scene.splinecode"
              />
            </div>
          ) : level < 21 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/O0Sl4ywtz-muCqNC/scene.splinecode"
            />
          ) : level < 31 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/HQk3zt1YEJNNpIMv/scene.splinecode"
            />
          ) : level < 41 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/NK3aT6hTvsLAsxSD/scene.splinecode"
            />
          ) : level > 51 ? (
            <Spline
              className=""
              scene="https://prod.spline.design/HQk3zt1YEJNNpIMv/scene.splinecode"
            />
          ) :
            <Image src={'/boonisland.png'} fill alt={""} />}
        </>
      ) : <Image src={'/boonisland.png'} fill alt={""} />}
    </div>
  );
};

export default Island;
