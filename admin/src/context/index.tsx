import { createContext, useContext, useRef, useState } from "react";

export const GlobalContext = createContext({});

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

const INIT_STATE = {
    currentBlockNumber: 0,
    pools: [],
}
    
const GlobalProvider = ({ children }: any) => {

    const [state, setState] = useState(INIT_STATE);
    const stateRef = useRef(state);

    const update = (newState: any) => {
        setState((prevState: any) => {
            const updatedState = { ...prevState, ...newState }
            stateRef.current = updatedState;
            return updatedState;
        });
    }

    const updateWithFunction = (newState: any) => {
        setState((prevState: any) => {
            const updatedState = 
                typeof newState === "function" 
                    ? newState(prevState) 
                    : { ...prevState, ...newState };
    
            stateRef.current = updatedState;
            return updatedState;
        });
    };
    
    return (

        <GlobalContext.Provider
            value={{ state, stateRef, update, updateWithFunction }}
        >
            {children}
        </GlobalContext.Provider>

    )
}

export { useGlobalContext, GlobalProvider };
