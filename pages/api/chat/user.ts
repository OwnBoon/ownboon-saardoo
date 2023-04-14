import { NextApiHandler } from "next"

interface Props {
    id: any
    name: string
    room: any
    pfp: any
}


let users: any = [];
export const addUser = ({ id, name, room, pfp }: Props) => {
  if (!name || !room) return { error: "Username and room are required." };
  const user = { id, name, room, pfp };

  users.push(user);

  return { user };
};
 export const removeUser = (id: any) => {
  const index = users.findIndex((user: any) => user.id === id);
  return users[index];
};


