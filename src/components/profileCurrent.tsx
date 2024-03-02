'use client'



import React, {  useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import Gallery from './gallery'
import { Separator } from "@/components/ui/separator"
import MenuMobile from './menuMobile'
import {  useQuery} from '@tanstack/react-query'
import ProfileOption from './profileOption'
import AvatarOption from './avatarOption'
import axios from 'axios'
import ModalFollowing from './modalFollowing'
import ModalFollower from './modalFollower'
import { useRouter } from 'next/navigation';
import { Usered } from '@/lib/validator/currentUser'

const ProfileCurrent = (props:{profile:Usered}) => {
    const [save,setSave]=useState(false);
    const router = useRouter()
    const [follower,setFollower]=useState( props.profile.followers ? props.profile.followers.length : 0)
    const [following,setFollowing]=useState(props.profile.following ? props.profile.following.length :0)
    
    const savePost = useQuery({
        queryFn: async () => {
          const  data  = (await axios.get(`/api/save?p=${props.profile.id}`)).data;
        return data;
        },
        queryKey: [`userSavePost${props.profile.id}`],
        enabled:true
      })

  return (
    <>
            <MenuMobile username={props.profile.username} profile={true} />
            <div className='  max-w-[975px] pt-[60px] md:pt-[0px] h-full w-screen md:w-full'>
                <div className=' w-full justify-between flex flex-row h-[190px]'>
                    <div className='w-[290px] h-full flex justify-center content-center items-center md:mr-7'>
                <AvatarOption  url={props.profile.profilePictureUrl||""} username={props.profile.username} avatarkey={props.profile.avatarkey||""}>
                    <Avatar className='md:w-[150px] md:h-[150px] w-[77px] h-[77px]'>
                        <AvatarImage  className='md:w-[150px] md:h-[150px] w-[77px] h-[77px]' src={props.profile.profilePictureUrl||''} />
                        <AvatarFallback className='md:w-[150px] md:h-[150px] w-[77px] h-[77px]'>{props.profile.username}</AvatarFallback>
                    </Avatar>
                </AvatarOption>
                    
                    </div>
                    <div className=' h-full flex flex-col justify-center p-6 md:p-0 gap-4 content-center w-full'>
                        <div className='flex flex-row justify-start content-center text-center items-center gap-8 w-full'>
                            <h2 className='text-[20px]'>{props.profile.username}</h2>
                            <Button onClick={()=>{
                        router.push('/account')
                        router.refresh()
                }}  >Edit profil</Button>
                            <ProfileOption current={false}  uploadDate={props.profile.joinedAt.toString()} avatar={props.profile.profilePictureUrl||""} username={props.profile.username} name={props.profile.fullName||""}>
                                <svg aria-label="Options" className="cursor-pointer x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </ProfileOption>
                        </div>
                        <div className='flex flex-row justify-start content-center text-center items-cente gap-8 w-full'>
                            <span className='text-xs sm:text-base'>
                                {props.profile.posts ? props.profile.posts.length: 0} publications
                            </span>
                            <ModalFollower id={props.profile.id}>
                            <span className='text-xs sm:text-base'>
                                {follower} followers
                            </span>
                            </ModalFollower>

                            <ModalFollowing   id={props.profile.id}>
                                <span className='cursor-pointer text-xs sm:text-base'>
                                    {following} following
                                </span>
                            </ModalFollowing>
                            
                        </div>
                        <div className='flex flex-col  content-center text-start items-cente justify-start gap-3 w-full'>
                            <div>
                                {props.profile.fullName}
                            </div>
                            <div>
                                {props.profile.gender}
                            </div>
                            <div>
                                {props.profile.bio}
                            </div>
                        </div>
                    </div>
    
                </div>
    
                <Separator className='mt-10 mb-10' />
                <nav
                    className={"flex mb-4 w-full gap-4 justify-center placeholder:items-center "}
                    >
                    <Button
                        onClick={()=>{setSave(false)}}
                        variant={'ghost'}          
                        className="text-sm font-medium flex-row flex gap-2 items-center transition-colors "
                    >
                        <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title></title><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                        POST
                    </Button>
                    <Button onClick={()=>{setSave(true)}}
                        variant={'ghost'}
                        className="text-sm font-medium flex-row flex gap-2 items-center  transition-colors "
                    >   <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                        SAVED
                    </Button>
                    
                </nav>
                {
                !save? <Gallery photos={props.profile.posts} />:<Gallery photos={savePost.data} />
            }
            </div>
            </>
  )}

export default ProfileCurrent
