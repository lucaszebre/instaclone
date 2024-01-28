"use client"

import Chat from '@/components/chat'
import { Conversation } from '@/lib/validator/convertation'
import { Usered } from '@/lib/validator/currentUser'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

interface PageProps {
    params: {
        slug: string
    }
}


const Page = ({ params }: PageProps) => {
    const { slug } = params

    const conv = useQuery({
        queryFn: async () => {
            const  data  = (await axios.get(`/api/conversation?id=${slug}`)).data;
            return data as Conversation


    },
    queryKey: [`${slug}`],
    })



    const currentUser =useQuery({
        queryFn: async () => {
            const  data  = await axios.get('/api/user');
            const {User}= data.data ;
        
            return User as Usered
        },
        queryKey: ['user'],
        enabled:true
    })


    if(conv.data?.recipient?.id!==currentUser.data?.id){
        return (
            <>
            <Chat  sessionId='' sessionImg={conv.data?.recipient?.profilePictureUrl || ""} username={conv.data?.recipient?.username || ""} initialMessages={ conv.data?.messages || []} chatId={`${conv.data?.initiator?.id}--${conv.data?.recipient?.id}`||""}         chatPartner={conv.data?.recipient}/>
            </>
        )
        }else{

            return (
                <>
                <Chat  sessionId='' sessionImg={conv.data?.initiator?.profilePictureUrl || ""} username={conv.data?.initiator?.username || ""} initialMessages={conv.data?.messages||[]} chatId={`${conv.data?.initiator?.id}--${conv.data?.recipient?.id}`||""}         chatPartner={conv.data?.initiator }/>
                </>
            )
        }
        
    
}

export default Page
