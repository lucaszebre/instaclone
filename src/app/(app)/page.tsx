'use server'

import React from 'react';
import Main from '@/components/main';
// import { cookies } from 'next/headers'
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
// import { Database } from '@/lib/database.type';
// import { useRouter } from 'next/navigation';

export default async function Home() {
    
  // const cookieStore = cookies()

  // const supabase = createServerActionClient<Database>({ cookies: () => cookieStore })
  // let router = useRouter()
  // const data = await supabase.auth.getSession()
  // if(!data.data.session?.user.id){
  //   router.push('/auth')
  // }
  return (
    <>
     
          <Main />
     
      
    </>
  );
}
