import { createContext, useState } from "react";

const LoginReigsterToggleContext = createContext();


export function LoginRegisterModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen((prev) => !prev);

    return (
        <LoginReigsterToggleContext.Provider value={{ isOpen, toggleModal }}>
            {children}
        </LoginReigsterToggleContext.Provider>
    )

}

export default LoginReigsterToggleContext;