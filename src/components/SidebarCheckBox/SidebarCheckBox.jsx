import { useContext, useRef } from "react";
import { useState } from "react";
import "./SidebarCheckBox.css"
import useSidebar from "../../hooks/useSidebar";

export default function SidebarCheckBox(){
    const { checkboxRef } = useSidebar();
    return(
        <>
            <input ref={checkboxRef} type="checkbox" id="sidebar-toggle" className="sidebar-checkbox"/>
            <label htmlFor="sidebar-toggle" className="sidebar-toggle-button">&#9776;</label>
        </>
    )
}