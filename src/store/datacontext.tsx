/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.type'


export type DataContextType = {
    session: string | undefined; 
};


export const DataContext = createContext<DataContextType>({} as DataContextType);



export const DataProvider = async (props: { children: React.ReactNode }) => {

    const supabase = createClientComponentClient<Database>()
        
    const data = await supabase.auth.getSession()

        
        const session=   data.data.session?.access_token  
            

    return (
        <DataContext.Provider value={{
            session 
        }}>{props.children}</DataContext.Provider>
    );
    };