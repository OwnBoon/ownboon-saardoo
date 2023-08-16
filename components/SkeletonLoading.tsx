import React, { ReactNode, useEffect } from 'react'
interface Props {
    children?: ReactNode, 
    loading : boolean, height : string, width: string}

export default function SkeletonLoading({ children,loading, height, width}: Props) {

  return (
    <>
 { loading ? <div className={` skeletonloading`} style={{height : height, width : width}}>{children}</div> : 
  children
  }
    </>
  )
}
