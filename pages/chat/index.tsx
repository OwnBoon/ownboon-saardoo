import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import prisma from "../../lib/db";
import { initialProfile } from "../../lib/initial-profile";
import { InitialModal } from "../../chat-components/modals/initial-modal";

const SetupPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user);
  let server;

  useEffect( () => { 
    async function fetchData() {
        try {
          const profile = await initialProfile(user);

          server = await prisma.server.findFirst({
            where: {
              //@ts-ignore
              members: {
                some: {
                  profileId: profile.id
                }
              }
            }
          });
        } catch (err) {
            console.log(err);
        }
    }
    fetchData();
}, []);

  


  //   let server:any;
  //   useEffect( () => {
  //     async function fetchData() {
  //         try {

  //           const newProfile = await prisma.profile.create({
  //             data: {
  //               //@ts-ignore
  //               userId: user?.id,
  //               name: `${user?.username}`,
  //               //@ts-ignore
  //               imageUrl: user?.imageUrl,
  //               //@ts-ignore
  //               email: user?.emailAddresses[0].emailAddress
  //             }
  //           });

  //           server = await prisma.server.findFirst({
  //             where: {
  //               //@ts-ignore
  //               members: {
  //                 some: {
  //                   profileId: user?.id
  //                 }
  //               }
  //             }
  //           });

  //         } catch (err) {
  //           return err;
  //         }
  //     }
  //     fetchData();
  // }, []);

  if (server) {
    //@ts-ignore
    return redirect(`/servers/${server.id}`);
  }

  //@ts-ignore
  return <InitialModal userid={user?.id} />;
};

export default SetupPage;
