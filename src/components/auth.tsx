// import { useState } from 'react'
import React, { useState } from 'react';
import { Login } from './login'
import { Button, buttonVariants } from './ui/button'
import { cn } from '../lib/utils'
import { Register } from './register';
import Link from 'next/link';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Auth() {

  return (
    
   

    <div className=" relative bg-white w-full h-screen flex col content-center items-center justify-center ">
      
      <div className="relative w-full bg-white  h-full flex-col bg-muted p-10 text-white dark:border-r  ">
       
      <div className="relative z-20 hidden items-center text-lg font-medium md:flex">
          <Link href='/'><Image
                    src={'/assets/logo-dark.svg' }                    alt=""
                    width={152}
                    height={26}
                    /></Link>
          
        </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-row justify-center space-y-6 sm:w-[350px]">
        
        <Tabs defaultValue="register" className="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login"><Login /></TabsContent>
  <TabsContent value="register"><Register /></TabsContent>
</Tabs>
          
        </div>
      </div>
    </div>
    </div>

    
    
  )
}

export default Auth