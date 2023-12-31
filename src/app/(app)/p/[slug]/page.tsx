"use server"
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import Post from '@/components/post'

interface PageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params



  const post = await prisma.post.findUnique({
    where: { id: slug },
    include: {
      comments:{
        include:{
          user:true
        }
      },
      likes:true,
      tags:true,
      taggedUsers:true,
      user:true
    }
    },
  )


  if (!post) return notFound()

  return (
    <div className='flex flex-row justify-center h-full items-center w-full'>
      <Post userId={post.userId} image={post.imageUrl} alt={post.author} username={post.user.username} id={post.id} comments={post.comments} likes={post.likes} avatar={post.user.profilePictureUrl||""} fullName={post.user.fullName||""} city={"Paris"} randomPeopleWhoLike={''} like={post.likes.length}   />
    </div>
  )
}

export default page