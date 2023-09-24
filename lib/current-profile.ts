import { auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'
import { useUser } from "@clerk/nextjs";

import { db } from "../lib/db";

export const currentProfile = async () => {

  //@ts-ignore
  // const { userId } = auth();

  //@ts-ignore
  const {userId} = await getAuth();
 
  // let userId = user.id;
  // let userId = "user_2Vbq8ngXaJdYPavD1AEELmu3efw"


  if (!userId) {
    return null;
  }


  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  });

  // return NextResponse.json({
  //   items: messages
  // });
  return NextResponse.json({profile});
}