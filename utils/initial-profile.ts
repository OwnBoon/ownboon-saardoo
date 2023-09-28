import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs';
import { db } from "../lib/db";

//@ts-ignore
export const initialProfile = async () => {
  const user = await auth();

  if (!user) {
    return redirect('/sign-up');
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      //@ts-ignore
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
};
