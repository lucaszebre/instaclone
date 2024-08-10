'use server'

import { auth } from "../auth";
import { redirect } from "next/navigation";
import prisma from "../lib/db"
export async function getUser(email?:string) {

  if(email){
    
    const user = await prisma.user.findUnique({
      where: { email: email }
  });





    return user
  }


  
  try {
  const session = await auth()

   if (!session?.user?.email) throw Error('Need to be auth');

    // Check if the history entry exists
 

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
  });





    return user
  } catch (error) {
    console.error('Error saving letter:', error);
    
  }
}