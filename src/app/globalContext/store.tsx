
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type GlobalDataType = {
    userid?:number
    staffid?: number;
    username?:string;
}

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    data?: GlobalDataType[],
    setData: Dispatch<SetStateAction<GlobalDataType[]>>
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string  => '',
    data: [],
    setData: (): GlobalDataType[] => [] 
})

export const GlobalContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('initial value');
    const [data, setData] = useState<[] | GlobalDataType[]>([]);
    
    return (
        <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);