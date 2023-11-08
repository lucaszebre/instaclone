'use client'


import React from 'react';
import { Login } from './login'
import { Register } from './register';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Auth() {

  return (
    
   

    <div className=" relative bg-white w-full h-screen flex col content-center items-center justify-center ">
      
      <div className="relative w-full bg-white  h-full flex-col bg-muted p-10 text-white dark:border-r  ">
       
      <div className="relative z-20 hidden items-center text-lg font-medium md:flex">
          
          
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