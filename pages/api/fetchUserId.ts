import type {NextApiRequest, NextApiResponse} from "next"
import { useUser } from "@clerk/nextjs";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isLoaded, isSignedIn, user } = useUser();

  res.status(200).json({ user})
}