import prisma from '@/lib/db';
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.type';


export async function POST(req: Request) {
    try {
        
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
      
        let userId=data.data.session?.user.id

        if(userId===undefined){
            return new Response('Unauthorized', { status: 401 })
        }

        const url = new URL(req.url)
        
        const postId = url.searchParams.get('p')

        if (!postId) return new Response('Invalid query', { status: 400 })

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return new Response('Post not found', { status: 404 })
        }

    

    
            // If the like exists, remove it (unlike the post)
            await prisma.like.delete({
                where: {
                    postId_userId: { postId, userId },
                },
            });
            return new Response('Post unliked', { status: 404 })
       
        // return new Response(JSON.stringify(posts))

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}

export async function DELETE(req: Request) {
    try {
        
        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
      
        let userId=data.data.session?.user.id

        if(userId===undefined){
            return new Response('Unauthorized', { status: 401 })
        }

        const url = new URL(req.url)
        
        const postId = url.searchParams.get('p')

        if (!postId) return new Response('Invalid query', { status: 400 })

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return new Response('Post not found', { status: 404 })
        }

       


            // If the like exists, remove it (unlike the post)
            await prisma.like.delete({
                where: {
                    postId_userId: { postId, userId },
                },
            });
            return new Response('Post unliked', { status: 404 })
        // return new Response(JSON.stringify(posts))

    } catch (error) {
        return new Response('Server error', { status: 500 })

    }

  
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const postId = url.searchParams.get('p');

        if (!postId) return new Response('Invalid query', { status: 400 });

        const cookieStore = cookies()

        const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
        
        const data = await supabase.auth.getSession()
      
        let userId=data.data.session?.user.id

        if(userId===undefined){
            return new Response('Unauthorized', { status: 401 })
        }

        const like = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });

        const isLiked = like !== null;

        return new Response(JSON.stringify(isLiked), { status: 200 });

    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
}


