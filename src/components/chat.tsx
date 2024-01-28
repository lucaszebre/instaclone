"use client"
import React, { FC, useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { pusherClient } from '@/lib/pusher'
import { cn, toPusherKey } from '@/lib/utils'
import { Message } from '@/lib/validator/message'
import { format } from 'date-fns'
import Image from 'next/image'
import { Usered } from '@/lib/validator/currentUser'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import InputEmoji from 'react-input-emoji'
import ChatOption from './optionChat'

interface MessagesProps {
  initialMessages?: Message[]
  sessionId: string
  chatId: string
  sessionImg: string | null | undefined
  chatPartner: Usered | undefined
  username:string
}
const Chat: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatId,
  chatPartner,
  sessionImg,
  username,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages?initialMessages:[])
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  
  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`chat:${chatId}`)
    )

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev])
    }



    pusherClient.bind('incoming-message', messageHandler)

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`chat:${chatId}`)
      )
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId])

  const scrollDownRef = useRef<HTMLDivElement | null>(null)

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, 'HH:mm')
  }

  const sendMessage = async () => {
    if(!input) return
    setIsLoading(true)
    try {
      await axios.post('/api/message', { text: input, chatId })
      setInput('')
      textareaRef.current?.focus()
    } catch {
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className='flex relative  flex-col w-[100%] h-[100%]'>
      <div className='flex flex-row  border-b-2 border-gray-200 items-center justify-between align-center w-[100%] h-[80px] p-3'>
          <div className='flex flex-row gap-2 items-center'>
              <Avatar className='w-[44px] h-[44px]'>
                  <AvatarImage src={sessionImg||""} />
                  <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
              <span>{username}</span>
          </div>
          <div>
            <ChatOption id={chatId}>
            <svg aria-label="Conversation information" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Conversation information</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>

            </ChatOption>
          </div>
      </div>

      <div
      id='messages'
      className='flex h-full flex-1 flex-col-reverse relative gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      <div ref={scrollDownRef} />

      {messages && messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId

        return (
          <div
            className='chat-message'
            key={`${message.id}-${message.timestamp}`}>
            <div
              className={cn('flex items-end', {
                'justify-end': isCurrentUser,
              })}>
              <div
                className={cn(
                  'flex flex-col space-y-2 text-base max-w-xs mx-2',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}>
                <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-indigo-600 text-white': isCurrentUser,
                    'bg-gray-200 text-gray-900': !isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}>
                  {message.text}{' '}
                  <span className='ml-2 text-xs text-gray-400'>
                    {formatTimestamp(message.timestamp)}
                  </span>
                </span>
              </div>

              <div
                className={cn('relative w-6 h-6', {
                  'order-2': isCurrentUser,
                  'order-1': !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}>
                <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner?.profilePictureUrl ||""
                  }
                  alt='Profile picture'
                  referrerPolicy='no-referrer'
                  className='rounded-full'
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>

      <div className='flex  flex-row justify-between align-center w-[100%] h-[80px] p-3'>

      <InputEmoji
      
            inputClass=''
            value={input}
            onChange={setInput}
            onEnter={()=>{ 
              sendMessage()}}
              placeholder={`Message ${chatPartner?.username}`}

        />
      
      </div>
    </div>
  )
}

export default Chat
