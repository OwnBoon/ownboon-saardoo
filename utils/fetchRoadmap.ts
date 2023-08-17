import {  Posts, Roadmaps, User, Videos } from '../typings'

export const fetchRoadmaps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getRoadmaps`)

  const data = await res.json()
  const roadmaps: Roadmaps[] = data.roadmaps
  return roadmaps
}