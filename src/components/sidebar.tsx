"use client"

/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useStore } from "@/store/zus"
import Plus from "./plus"
import Search from "./search"
import AddFile from "./addFile"
import Tool from "./tool"
import {  useState } from "react"
import { usePathname } from 'next/navigation'
import {  useQuery } from "@tanstack/react-query"
import Link from "next/link"
import axios from "axios"
import {  Usered } from "@/lib/validator/currentUser"
import dynamic from "next/dynamic"

 function Sidebar() {
  
  const { setSide, side,short,setShort } = useStore()
  const [search,setSearch]=useState(false)
  // Function to handle sidebar toggle


  const {
    isFetching,
    data,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      const  data  = await axios.get('/api/user');
      const {User}= data.data ;

      return User as Usered
    },
    queryKey: ['user'],
    enabled:true
  })


  const handleSidebarToggle = (newSide:string) => {
    if(newSide==='search'){
      setSearch(true)
    }else{
      setSide(newSide);
      setSearch(false)
      setShort( newSide === 'messages'); // Set short to true if 'search' or 'messages'
    }
};

const pathname = usePathname()

const path = new RegExp(
  '^/direct(?:\/.*|)$'
);


  return (
<div className={`  ${   path.test(pathname)   && 'md:w-[96px]' || ' xl:max-w-[250px] md:max-w-[96px] w-full'} bg-white dark:bg-black  transition-width duration-500   absolute z-20 bottom-0  md:fixed h-[48px] flex md:flex-col flex-row   md:h-screen md:border-black-400 md:border-r-2`}>
    <div className={` ${   path.test(pathname)  && 'md:w-[96px]' || ' xl:max-w-[250px] md:max-w-[96px] w-full'}  flex md:flex-col flex-row md:py-4 h-full `} >
        <div className="md:px-3   md:py-2 flex md:flex-col flex-row  justify-between h-full max-md:w-full">
            
            <div  className={`${  path.test(pathname)  ?'hidden':'xl:flex hidden'} mb-[20px] `}>
           <Button  variant="link" className={` w-full justify-center md:justify-start gap-5`}>
                <svg aria-label="Instagram" className=" x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="29" role="img" viewBox="32 4 113 32" width="103"><title>Instagram</title><path clipRule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fillRule="evenodd"></path></svg>
            </Button>
            </div>

            <Link href='/'>
            <div className={`${  path.test(pathname)  && 'flex'||'xl:hidden'} mb-[20px]  md:flex justify-center hidden  `}>

            <svg aria-label="Instagram" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Instagram</title><path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path></svg>            </div>

            </Link>
            <div className="md:space-y-1 content-start   md:flex md:flex-col flex-row md:w-full w-screen items-center z-10  grid grid-cols-5 grid-rows-1 md:justify-center">
                
                
                <Button asChild  variant="ghost" className="h-full md:h-[50px] md:w-full  justify-center md:justify-start gap-5 ">
                    <Link href={'/'} onClick={()=>{setShort(false)}}>
                      <Tool name="Home">
                        {pathname==='/'  ? <svg aria-label="Accueil" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Accueil</title><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg>: <svg aria-label="Accueil" className=" hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Accueil</title><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>}
                      </Tool>
                      <p className={`${pathname==='/'  ?'font-bold':''} ${   path.test(pathname)  ? 'hidden' : 'xl:flex  hidden'} `}>Home</p>
                    </Link>
                </Button>

                <Search>
                  <Button onClick={() => handleSidebarToggle('search')} variant="ghost" className=" w-full h-full md:h-[50px]  justify-center md:justify-start gap-5">
                    <Tool name="search">
                        {search? <svg aria-label="Découvrir" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Découvrir</title><path d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="16.511" x2="21.643" y1="16.511" y2="21.643"></line></svg> : <svg aria-label="Découvrir" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Découvrir</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>   }   
                    </Tool>
                    <p className={`${search?'font-bold':''} ${   path.test(pathname)  &&  'hidden' || 'xl:flex  hidden'} `}>Search</p>
                  </Button>
                </Search>
                
                <AddFile>
                  <Button   variant="ghost" className="w-full  h-full md:h-[50px] justify-center md:justify-start gap-5">
                    <Tool name="create">
                      <svg aria-label="Accueil" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Accueil</title><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>       
                    </Tool>
                    <p className={` ${  path.test(pathname) ? 'hidden' : 'xl:flex  hidden'}`}>Create</p> 
                  </Button>
                </AddFile>
                    

                
                    <Button asChild  onClick={() => handleSidebarToggle('messages')} variant="ghost" className="md:w-full h-full md:h-[50px]  justify-center md:justify-start gap-5">
                      <Link href={'/direct'}>
                      <Tool name="messages">
                        {   path.test(pathname)  ?<svg aria-label="Direct" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Direct</title><path d="M22.91 2.388a.69.69 0 0 0-.597-.347l-20.625.002a.687.687 0 0 0-.482 1.178L7.26 9.16a.686.686 0 0 0 .778.128l7.612-3.657a.723.723 0 0 1 .937.248.688.688 0 0 1-.225.932l-7.144 4.52a.69.69 0 0 0-.3.743l2.102 8.692a.687.687 0 0 0 .566.518.655.655 0 0 0 .103.008.686.686 0 0 0 .59-.337L22.903 3.08a.688.688 0 0 0 .007-.692" fillRule="evenodd"></path></svg>:                <svg aria-label="Direct" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Direct</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>}
                      </Tool>
                    <p className={`${  path.test(pathname)   ?'font-bold':''} ${short || path.test(pathname) ? 'hidden' : 'xl:flex  hidden'}`}>Messages</p>
                      </Link>
                      
                    </Button>
                
                <Button asChild  onClick={()=>{setShort(false)}}  variant="ghost" className="md:w-full h-full md:h-[50px] justify-center md:justify-start gap-5">
                  <Link href={`/${data?.username}`}>
                    <Tool name="Profile blabla">
                      <Avatar className={`${pathname===`/${data?.username}`?'border-2 ':''} hover:w-[26px] hover:h-[26px] w-[24px] h-[24px]`} >
                          <AvatarImage src={data?.profilePictureUrl||'./icon_profile.png'} />
                          <AvatarFallback>{data?.username}</AvatarFallback>
                      </Avatar>
                    </Tool>
                    <p className={`${pathname===`/${data?.username}`?'font-bold':''} ${ path.test(pathname) ?'hidden' : 'xl:flex  hidden'}`}>Profil</p> 
                  </Link>
                </Button>
                </div>
            
            <div className="md:flex hidden">
                <Plus>
                  <Button onClick={() => handleSidebarToggle('plus')} variant="ghost" className="w-full h-full md:h-[50px] justify-start gap-5">
                      <Tool name="More">
                        {side==='plus'? <svg aria-label="Paramètres" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Paramètres</title><path d="M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z"></path></svg> :<svg aria-label="Paramètres" className="hover:w-[26px] hover:h-[26px] x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Paramètres</title><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line></svg>}
                      </Tool>
                      <p className={`${side=='plus'?'font-bold':''} ${   path.test(pathname) ?'hidden' : 'xl:flex  hidden'}`}>More</p>
                  </Button>
                </Plus>
                    
                

                
            </div>
            
        </div>
    </div>
</div>
    )
}


export default Sidebar