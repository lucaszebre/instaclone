import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import Profile from '@/components/profile'

interface PageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
        // This code runs on your server before upload
        const {
          data: { session },
        } = await supabase.auth.getSession()

  const profile = await prisma.user.findUnique({
    where: { username: slug },
    include: {
      posts:{include:{
        user:true,
        likes:true,
        comments:true,
        taggedUsers:true,
        tags:true
      }},
      followers:true,
      following:true,

      },
    },
  )

  if (!profile) return notFound()

  return (
    <div className='flex flex-row justify-center w-full'>
      <Profile profile={profile}  />
    </div>
  )
}

export default page