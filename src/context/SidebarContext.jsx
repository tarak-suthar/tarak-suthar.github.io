import { createContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    function check() {
        setIsOpen(true);
    }
    function unCheck() {
        setIsOpen(false);
    }
    function toggle() {
        setIsOpen(prev => !prev);
    }

    // Alias for clearer API
    const openSidebar = check;
    const closeSidebar = unCheck;
    const toggleSidebar = toggle;

    return (
        <SidebarContext.Provider value={{ isOpen, check, unCheck, toggle, openSidebar, closeSidebar, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarContext;