"use client"
import Chat from '@/components/chat'
import { Conversation } from '@/lib/validator/convertation'
import { Usered } from '@/lib/validator/currentUser'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import CardSideProfile from '@/components/cardSideProfile';
import NewMessage from '@/components/newMessage';
import { useState } from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { DataContext } from '@/store/datacontext'
import useScreenSize from '@/hooks/useScreenSize';

interface PageProps {
    params: {
        slug: string
    }
}




const Page = ({ params }: PageProps) => {
    const router = useRouter();
    const {session} = useContext(DataContext)
    const Conv =useQuery({
        queryFn: async () => {
          const  data  = await axios.get('/api/conversation');
          const dated= data.data ;
          return dated as Conversation[]
        },
        queryKey: [`conversation`]
        })
        
        
        let screenSize = useScreenSize();
        console.log(screenSize)
       

          
    
        const [inbox,setInbox] =useState(false)
        useEffect(()=>{
          console.log(screenSize.width)
          if(screenSize.width<1024){
            
            setInbox(true)
          }else{
            setInbox(false)
          }

        },[screenSize])
    

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
    if(!session){
      router.push("/auth")
    }
    if(conv.data?.recipient?.id!==currentUser.data?.id){
        return (
            <>
    <div className='flex flex-row w-full'>
          {!inbox &&
        <div className={`md:flex hidden flex-col justify-start h-screen w-full max-w-full  border-r-2 border-gray-200`}>
            <div className='flex p-4  flex-col h-[110px] justify-center w-full border-b-2 border-gray-200'>
              <div className='flex flex-row justify-between'>
             {inbox?<svg aria-label="Back" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Back</title><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>:null} 
                <span>{currentUser.data?.username}</span>
                <NewMessage>
                  <svg aria-label="New message" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New message</title><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                </NewMessage>

                        
              </div>
    
            </div>
            <div className='flex flex-col gap-2 overflow-y-scroll h-full pb-[48px] overflow-x-hidden'>


              {Conv.data?.map((c,index)=>{
                if(c.recipient?.id!==currentUser.data?.id){
                  return (
                    <CardSideProfile chatId={c.id} key={index}  inbox={true} name={c.recipient?.username||""} subname={c.recipient?.fullName||""} url={c.recipient?.profilePictureUrl ? c.recipient.profilePictureUrl : ""} username={c.recipient?.username ? c.recipient.username :""} />
  
                  )
                }else{
                  return (
                    <CardSideProfile chatId={c.id} key={index}  inbox={true} name={c.initiator?.username||""} subname={c.initiator?.fullName||""} url={c.initiator?.profilePictureUrl ? c.initiator.profilePictureUrl : ""} username={c.initiator?.username ? c.initiator.username :""} />
  
                  )
                }
                
              })}
            

            </div>
            
        </div>}

        <>
            <Chat   sessionId={slug} sessionImg={conv.data?.recipient?.profilePictureUrl || "/default-profile-image.jpg"} username={conv.data?.recipient?.username || ""} initialMessages={ conv.data?.message || []} chatId={`${conv.data?.initiator?.id}--${conv.data?.recipient?.id}`||""}         chatPartner={conv.data?.initiator}/> 
            {/* error here */}
            </>
             
    </div>
    
  
    </>
        )
        }else{

            return (
                <>
    <div className='flex flex-row w-full'>
    {!inbox &&
        <div className={`flex flex-col justify-start h-screen w-full ${inbox?'max-w-full':'max-w-[400px]'}  border-r-2 border-gray-200`}>
            <div className='flex p-4  flex-col h-[110px] justify-center w-full border-b-2 border-gray-200'>
              <div className='flex flex-row justify-between'>
             {inbox?<svg aria-label="Back" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Back</title><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>:null} 
                <span>{currentUser.data?.username}</span>
                <NewMessage>
                  <svg aria-label="New message" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New message</title><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                </NewMessage>

                        
              </div>
            </div>
            <div className='flex flex-col gap-2 overflow-y-scroll h-full pb-[48px] overflow-x-hidden'>


              {Conv.data?.map((c,index)=>{
                if(c.recipient?.id!==currentUser.data?.id){
                  return (
                    <CardSideProfile chatId={c.id} key={index}  inbox={true} name={c.recipient?.username||""} subname={c.recipient?.fullName||""} url={c.recipient?.profilePictureUrl ? c.recipient.profilePictureUrl : ""} username={c.recipient?.username ? c.recipient.username :""} />
  
                  )
                }else{
                  return (
                    <CardSideProfile chatId={c.id} key={index}  inbox={true} name={c.initiator?.username||""} subname={c.initiator?.fullName||""} url={c.initiator?.profilePictureUrl ? c.initiator.profilePictureUrl : ""} username={c.initiator?.username ? c.initiator.username :""} />
  
                  )
                }
                
              })}
            

            </div>
            
        </div>
        }
        <>
        <Chat  sessionId={slug} sessionImg={conv.data?.initiator?.profilePictureUrl || ""} username={conv.data?.initiator?.username || ""} initialMessages={conv.data?.message||[]} chatId={`${conv.data?.initiator?.id}--${conv.data?.recipient?.id}`||""}         chatPartner={conv.data?.recipient }/>
            </>
    </div>
    
  
    </>
            )
        }
        
    
}



export default dynamic (() => Promise.resolve(Page), {ssr: false})




