import { redirect } from "next/navigation";
import { useEffect,useState } from "react";
// import { initialProfile } from "../../lib/initial-profile";
import { InitialModal } from "../../chat-components/modals/initial-modal";
import { PrismaClient } from '@prisma/client'
import { useUser } from "@clerk/nextjs";
import {db} from '../../lib/db'
import type { GetServerSideProps, NextPage } from "next";
import { initialProfile } from "../../utils/initial-profile";

//@ts-ignore
const SetupPage = ({user}) => {

  console.log(user)

  return <h1>hello</h1>
  
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/fetchUserId`)

  const data = await res.json()

  return {
    props: {
      user:data.user,
    },
  };
};

//@ts-ignore
export default SetupPage;
