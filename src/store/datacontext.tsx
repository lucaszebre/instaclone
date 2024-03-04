"use client"
/* eslint-disable react-hooks/exhaustive-deps */




import React, { createContext, useEffect, useState } from 'react';
import { Session } from '@supabase/auth-helpers-nextjs'
import supabaSingleton from '@/lib/supabaSingleton';


export type DataContextType = {
    session:Session | undefined | null
};


export const DataContext = createContext<DataContextType>({} as DataContextType);



export const DataProvider =  (props: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session|undefined|null>()

    const supabase = supabaSingleton();
  
   

        

        useEffect(() => {
            supabase.auth.onAuthStateChange((_event, session) => {
              setSession(session)
            })
          }, [])
            

    return (
        <DataContext.Provider value={{
            session
        }}>{props.children}</DataContext.Provider>
    );
    };