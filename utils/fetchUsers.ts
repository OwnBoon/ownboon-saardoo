import {  User } from '../typings'

export const fetchUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getUsers`, {next: {revalidate: 60}})

  const data = await res.json()
  const user: User[] = data.user
  return user
}