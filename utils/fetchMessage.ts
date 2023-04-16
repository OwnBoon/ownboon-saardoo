import {  Message } from '../typings'

export const fetchMessage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getMessage`)

  const data = await res.json()
  const messages: Message[] = data.messages
  return messages
}