import React from 'react'

//@ts-ignore
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";

//@ts-ignore
import sendbirdSelectors from "@sendbird/uikit-react/useSendbirdStateContext";

//@ts-ignore
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";


//@ts-ignore
const demo = () => {
    const globalStore = useSendbirdStateContext();
    const currentUserId = globalStore?.stores?.userStore?.user?.userId;

  return (
    <>
    
    </>
  )
}

export default demo