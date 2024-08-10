import { SessionProvider } from "next-auth/react"
import {auth} from  "../auth"
import React from "react"
export default async function ClientPage(props:{children:React.ReactNode}) {
  const session = await auth()
  


  return (
    <SessionProvider basePath={"/api/auth"} session={session}>
      {props.children}
    </SessionProvider>
  )
}