import {  Goals, Posts, User } from '../typings'

export const fetchGoals = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getGoals`)

  const data = await res.json()
  const goals: Goals[] = data.goals
  return goals
}