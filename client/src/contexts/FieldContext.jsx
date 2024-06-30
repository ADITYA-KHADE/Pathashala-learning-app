import {createContext,useContext,useState} from "react"

export const FieldContext = createContext();

export const useFieldContext = () => {
    return useContext(FieldContext);
}

export const FieldProvider = ({children}) => {
    const [value, setValue] = useState("pending");
    return(
        <FieldContext.Provider value={{value,setValue}}>
            {children}
        </FieldContext.Provider>
    )
}
