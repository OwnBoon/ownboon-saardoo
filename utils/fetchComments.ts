import { Comment } from '../typings'

export const fetchComments = async (blogId: string) => {
  const res = await fetch(`/api/getComments?blogId=${blogId}`)
  const comments: Comment[] = await res.json()
  return comments
}