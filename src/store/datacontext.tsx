/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';



export type DataContextType = {
    isLoggedIn:boolean, setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>;
};


export const DataContext = createContext<DataContextType>({} as DataContextType);



export const DataProvider = (props: { children: React.ReactNode }) => {

        
        
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        
            
            

    return (
        <DataContext.Provider value={{
        isLoggedIn, setIsLoggedIn
        }}>{props.children}</DataContext.Provider>
    );
    };