import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

import { redirect } from 'next/navigation'

import prisma from "../lib/db";

export const initialProfile = async (user:any) => {
  //@ts-ignore
  const users = user;

  if (!users) {
    return redirect('/sign-up');
  }

  const profile = await prisma.profile.findUnique({
    where: {
      //@ts-ignore
      userId: users.id
    }
  });
  console.log(profile)

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.profile.create({
    //@ts-ignore
    data: {
      //@ts-ignore
      userId: users.id,
      //@ts-ignore
      name: `${users.username}`,
      //@ts-ignore
      imageUrl: users.imageUrl,
      //@ts-ignore
      email: users.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
};
