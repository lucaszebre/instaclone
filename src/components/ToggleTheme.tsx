/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import 
{
DropdownMenuItem,
DropdownMenuSeparator,
} 
from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";

import { useTheme } from "next-themes";


const ToggleTheme = () => {
    const { setTheme  } = useTheme()

  return (
    <>
      <DropdownMenuItem onClick={() =>{
                        if(localStorage.getItem('theme')==="dark"){
                        localStorage.setItem('theme',"light")
                        setTheme("light")
                    }else{
                        localStorage.setItem('theme',"dark")
                        setTheme("dark")
                    } }}>
                        <Button  variant="ghost" className="w-full h-full md:h-[50px] justify-start gap-5" ><svg aria-label="Icône du thème" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Icône du thème</title><path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path></svg>Changer l'apparence</Button></DropdownMenuItem>
        <DropdownMenuSeparator />
    </>
  )
}

export default ToggleTheme