/* eslint-disable react/no-unescaped-entities */
"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.type'
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface Props {
    children: ReactNode;
  }
  
  const Plus: React.FC<Props> = ({ children }) => {
    const { setTheme  } = useTheme()
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
  return (
    <DropdownMenu 
            >
                <DropdownMenuTrigger className="w-full">
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-2 w-[250px]">
                    
                    <DropdownMenuItem onClick={()=>{
                        router.push('/account')
                        router.refresh()
                }}><Button  variant="ghost" className="w-full justify-start gap-5" ><svg aria-label="Paramètres" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Paramètres</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg> Paramètres</Button></DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() =>{
                        if(localStorage.get('theme')==="dark"){
                        localStorage.set('theme',"light",{ sameSite:'strict' })
                        setTheme("light")
                    }else{
                        localStorage.set('theme',"dark",{ sameSite:'strict' })
                        setTheme("dark")
                    } }}>
                        <Button  variant="ghost" className="w-full h-full md:h-[50px] justify-start gap-5" ><svg aria-label="Icône du thème" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Icône du thème</title><path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path></svg>Changer l'apparence</Button></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={async ()=>{
                            await supabase.auth.signOut()
                            router.push('/auth')
                            router.refresh()

                    } }><Button variant="ghost" className="w-full justify-start gap-5" >Déconnexion</Button></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
  );
};



export default dynamic (() => Promise.resolve(Plus), {ssr: false})
