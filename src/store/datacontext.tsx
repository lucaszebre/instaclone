/* eslint-disable react-hooks/exhaustive-deps */
export const dynamic = 'force-dynamic'
export const revalidate = 0;
export const dynamicParams = true


import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.type'


export type DataContextType = {
    userId: string | undefined; 
};


export const DataContext = createContext<DataContextType>({} as DataContextType);



export const DataProvider = async (props: { children: React.ReactNode }) => {

    const supabase = createClientComponentClient<Database>()
        
    const data = await supabase.auth.getSession()

        
        const userId=   data.data.session?.user.id 
            

    return (
        <DataContext.Provider value={{
            userId
        }}>{props.children}</DataContext.Provider>
    );
    };