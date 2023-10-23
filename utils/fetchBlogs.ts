import {  Posts, User } from '../typings'

export const fecthBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getBlog`, {next: {revalidate: 30}})

  const data = await res.json()
  const posts: Posts[] = data.posts
  return posts
}