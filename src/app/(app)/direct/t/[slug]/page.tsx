"use client"

import Chat from '@/components/chat'
import React from 'react'

interface PageProps {
    params: {
        slug: string
    }
}

const Page = ({ params }: PageProps) => {
    const { slug } = params
    return (
        <>
        <Chat />
        </>
    )
}

export default Page
