import { useContext } from "react";
import LoginReigsterToggleContext from "../context/LoginRegisterToggleContext";

export default function useLoginRegisterModal() {
    return useContext(LoginReigsterToggleContext);
}