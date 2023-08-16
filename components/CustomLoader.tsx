import React from 'react'
import {Loading } from "@nextui-org/react"
export default function CustomLoader() {
  return (
    <div className="flex w-full h-screen fixed z-100 bg-[#ffffff3d]  items-center justify-center">
        <Loading size='lg' color={"white"} type="default"/>
    </div>
  )
}
