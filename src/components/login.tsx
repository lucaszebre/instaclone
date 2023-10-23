import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SchemaLogin } from "@/types"
import { login } from "@/utils/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "./icons"
import React, { useContext, useState } from "react"
import { DataContext } from '@/store/datacontext';

export function Login() {
  const [isLoading,setIsLoading] = useState(false)
  const { setIsLoggedIn, isLoggedIn,  } =
  useContext(DataContext);
  const form = useForm<z.infer<typeof SchemaLogin>>({
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: "",
      password:""
      
    },
  })

  async function  onSubmit(values: z.infer<typeof SchemaLogin>) {
        await login(values.email, values.password,setIsLoading);
        setIsLoggedIn(true)
        setIsLoading(isLoading)

  }

  return (
    <>
    <Card className="p-4">
        
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl ">Login an account</CardTitle>
        <CardDescription >
          Enter your email below to login your account
        </CardDescription>
      </CardHeader>
    <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Email</FormLabel>
              <FormControl>
                <Input placeholder="lucas1@gmail.com" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-start items-start w-full" >Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn@dd11" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  type="submit" className="w-full">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Login</Button>
      </form>
    </Form>
    </Card>
    
</>
    
  )
}