import React from 'react';
import Auth from '../../../components/Auth';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';


 async function Home() {
   
    // const session = await auth()


    // if(session){
    //     redirect('/')
    // }
    

    return (
        <>
            <Auth />
        </>
    );
}


export default Home