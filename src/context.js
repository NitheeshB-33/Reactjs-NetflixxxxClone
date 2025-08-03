import { createContext, useState } from "react";

export const ListContext = createContext(null)

export default function Context ({children}) {
    const [list,setList]=useState([])

    return(
        <ListContext.Provider value={{list,setList}}>
            {children}
        </ListContext.Provider>
    )
}