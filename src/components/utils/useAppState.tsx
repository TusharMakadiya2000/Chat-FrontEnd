import { createContext, useReducer, ReactNode, useContext } from "react";

// Define the initial state and types
interface State {
    activeTab: string;
    userList: any[];
    groupList: any[];
    broadcastList: any[];
}

const initialState: State = {
    activeTab: "personal",
    userList: [],
    groupList: [],
    broadcastList: [],
};

// Reducer function to handle state changes
const reducer = (state: any, action = {}) => {
    return {
        ...state,
        ...action,
    };
};

export const StateContext = createContext<any>({});

// Provider component
export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, setAppState] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, setAppState]}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the state
export const useAppState = () => useContext(StateContext);
