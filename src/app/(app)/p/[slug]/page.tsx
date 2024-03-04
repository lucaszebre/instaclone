"use client"
import { notFound, useRouter } from 'next/navigation'
import Post from '@/components/post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dynamic from 'next/dynamic'
import supabaSingleton from '@/lib/supabaSingleton'
import { Session } from '@supabase/supabase-js'

interface PageProps {
  params: {
    slug: string
  }
}
const Page =  ({ params }: PageProps) => {

  const { slug } = params

  const { isLoading, data, isError } =useQuery({
    queryFn: async () => {
      
      const  {data}  = (await axios.get(`/api/post?q=${slug}`));
      console.log(data.data)
    return  data

    },
    
    queryKey: [slug]
    
    })
  

    console.log(data)

    if (isLoading) {
      return <p>Loading...</p>;
  }


  if (!data) return notFound()

  return (
    <div className='flex flex-row justify-center h-full items-center w-full'>
      <Post filekey={data.filekey ? data.filekey:""} userId={data.userId} image={data.imageUrl} alt={data.author} username={data.user.username} id={data.id} comments={data.comments} likes={data.likes} avatar={data.user.profilePictureUrl||""} fullName={data.user.fullName? data.user.fullName:""} city={"Paris"} randomPeopleWhoLike={''} like={data.likes.length}   />
    </div>
  )
}


export default dynamic (() => Promise.resolve(Page), {ssr: false})
