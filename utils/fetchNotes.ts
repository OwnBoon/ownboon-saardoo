import {  Goals, Notes, Posts, User } from '../typings'

export const fetchNotes = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getNotes`, {next: {revalidate: 60}})

  const data = await res.json()
  const notes: Notes[] = data.notes
  return notes
}