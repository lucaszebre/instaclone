import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.type'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data: session } = await supabase.auth.getSession()

  // Check if the user session exists
  if (!session) {
    // Redirect to /auth if the user is not authenticated
    return NextResponse.redirect('/auth');
  }  return res
}

export const config = {
  matcher: '/auth',
}