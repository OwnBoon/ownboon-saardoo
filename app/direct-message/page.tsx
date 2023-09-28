import { redirect } from "next/navigation";

import { db } from "../../lib/db";
import { initialProfile } from "../../lib/initial-profile";
import { InitialModal } from "../../chat-components/modals/initial-modal";

const SetupPage = async () => {
  // const profile = await initialProfile();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/fetchUserId`)
  const profile = await res.json()
  console.log(profile);
  // const server = await db.server.findFirst({
  //   where: {
  //     members: {
  //       some: {
  //         profileId: profile.id
  //       }
  //     }
  //   }
  // });

  // if (server) {
  //   return redirect(`/servers/${server.id}`);
  // }

  return (<h1>Hello</h1>);
}
 
export default SetupPage;