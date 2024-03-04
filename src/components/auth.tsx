'use client'

import React from 'react';
import { Login } from './login'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic';
import Register from './register';

function Auth() {

  return (
    
   

    <div className=" relative mt-5 mb-5 w-full h-screen flex col content-center items-center justify-center ">
      
       
      <div className="relative z-20 hidden items-center text-lg font-medium md:flex">
          
          
        </div>
        
        <Tabs defaultValue="register" className="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login"><Login /></TabsContent>
  <TabsContent value="register"><Register /></TabsContent>
</Tabs>
          
        </div>

    
    
  )
}


export default Auth

