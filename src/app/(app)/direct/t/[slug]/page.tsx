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

    
    return (
        <>
        <Chat  sessionId='' sessionImg={conv.data?.recipient?.profilePictureUrl || ""} username={conv.data?.recipient?.username || ""} initialMessages={[]} chatId={`${conv.data?.initiator?.id}--${conv.data?.recipient?.id}`||""}         chatPartner={conv.data?.recipient}/>
        </>
    )
}

export default Page
