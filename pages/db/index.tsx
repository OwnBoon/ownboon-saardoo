import { redirect } from "next/navigation";
import { useEffect,useState } from "react";
import { initialProfile } from "../../lib/initial-profile";
import { InitialModal } from "../../chat-components/modals/initial-modal";
import { PrismaClient } from '@prisma/client'
import { useUser } from "@clerk/nextjs";
import type { GetServerSideProps, NextPage } from "next";
import prisma from '../../app/lib/prisma'

//@ts-ignore
const SetupPage = () => {
  
    console.log(prisma)

  return <h1>hello</h1>;

};





//@ts-ignore
export default SetupPage;
