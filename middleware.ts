import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.type'

export async function middleware(req: NextRequest,resp:NextResponse) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data: session } = await supabase.auth.getSession()

  // Check if the user session exists
  if (!session) {
    // Redirect to /auth if the user is not authenticated
    return NextResponse.redirect('/auth');

  } 
  if(session.session?.user.id){
    resp.headers.set('session', session.session?.user.id)

  }

   return res
}

export const config = {
  matcher: '/auth',
}