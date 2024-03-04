"use client"

import { useRouter } from "next/navigation";



export default function NotFound() {
  const router = useRouter();

  const session = localStorage.getItem("session")

  if(!session){
    router.push('/auth')
  }

  

  return (
    <div className='flex flex-row w-full  items-center justify-start mt-6 text-center'>
      <div className='flex w-full flex-col gap-2'>
        <h2>Sorry, this page is not available.</h2>
        <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
      </div>
    </div>
  )
}