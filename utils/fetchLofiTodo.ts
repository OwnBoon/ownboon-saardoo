import {LofiTodo} from '../typings'

export const fetchNotes = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getLofiTodo`)

  const data = await res.json()
  const notes: LofiTodo[] = data.notes
  return notes
}