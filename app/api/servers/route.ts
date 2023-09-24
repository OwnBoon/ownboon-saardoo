import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { formatRFC3339 } from "date-fns";

import { currentProfile } from "../../../lib/current-profile";
import prisma from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl,userId} = await req.json();
    // const profile = await currentProfile();

    let user_id = userId.userid;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const server = await prisma.server.create({
    //   data: {
    //     profileId: user_id.userid,
    //     name,
    //     imageUrl,
    //     inviteCode: uuidv4(),
    //     //@ts-ignore
    //     Channel: {
    //       create: [
    //         //@ts-ignore
    //         { name: "general", profileId: user_id.userid}
    //       ]
    //     },
    //     Member: {
    //       create: [
    //         //@ts-ignore
    //         { profileId: user_id.userid, role: MemberRole.ADMIN }
    //       ]
    //     }
    //   },
    // });

    const server = await prisma.server.create({
      data: {
        profileId: user_id.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        //@ts-ignore
        channels: {
          create: [
            { name: "general", profileId: user_id.id }
          ]
        },
        members: {
          create: [
            { profileId: user_id.id, role: MemberRole.ADMIN }
          ]
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

