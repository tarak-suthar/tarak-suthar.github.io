import Header from "../Header"
import React from "react"
import "./Container.css"
import Sidebar from "../Sidebar"
import SidebarCheckBox from "../SidebarCheckBox"
import { ToastContainer } from "react-toastify"
import Footer from "../Footer"
import LoginRegisterModal from "../LoginRegisterModal";
import useLoginRegisterModal from "../../hooks/useLoginRegisterModal"


import ResponsiveSidebar from "../Sidebar/ResponsiveSidebar";

export default function Container(props) {
    const { toggleModal } = useLoginRegisterModal();

    return (
        <div className="body-container">
            <Header />
            <ResponsiveSidebar />
            <section className="main-content">
                {props.children}
            </section>
            <ToastContainer />
        </div>
    )
}