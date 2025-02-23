import { mdiClose, mdiCross } from "@mdi/js";
import Icon from "@mdi/react";
import LoginRegisterBar from "../LoginRegisterBar";
import useLoginRegisterModal from "../../hooks/useLoginRegisterModal";
import "./LoginRegisterModal.css";

export default function LoginRegisterModal(){
    const {isOpen, toggleModal} = useLoginRegisterModal()

    if(!isOpen) return null;

    return (
        <div className="lr-modal-container">
            <div className="lr-modal">
                <button className="lr-modal-cross" onClick={toggleModal}><Icon className="lr-m-cross-icon" path={mdiClose} size={2}/></button>
                <LoginRegisterBar/>
            </div>
        </div>
    )
}