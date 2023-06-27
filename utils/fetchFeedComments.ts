import { Comment } from '../typings'

export const fetchFeedComments = async (blogId: string) => {
  const res = await fetch(`/api/getFeedComments?blogId=${blogId}`)
  const comments: Comment[] = await res.json()
  return comments
}