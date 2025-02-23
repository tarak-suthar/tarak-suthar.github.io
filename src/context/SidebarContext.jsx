import { createContext, useRef } from "react";

const SidebarContext = createContext();

export function SidebarContextProvider({ children }) {
    const checkboxRef = useRef(null);
    function check() {
        checkboxRef.current.checked = true;
    }
    function unCheck() {
        checkboxRef.current.checked = false;
    }
    function toggle() {
        let state = checkboxRef.current;
        state.checked = state.checked ? false : true;
    }

    return (
        <SidebarContext.Provider value={{ checkboxRef, check, unCheck, toggle }}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarContext;