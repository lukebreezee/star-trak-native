import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState = {
    userInfo: null,
    teamInfo: null,
    stackDeciderRefreshSwitch: true
};

const Context = createContext(initialState);

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

export { Context, Store };