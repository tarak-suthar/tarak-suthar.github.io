import classNames from "classnames";
import "./RegisterButton.css";
import { useNavigate } from "react-router";
import { useContext } from "react";
import SidebarContext from "../../context/SidebarContext";
export default function RegisterButton(props){
    const navigate = useNavigate();
    const { unCheck} =useContext(SidebarContext);
    return <button onClick={()=>{ unCheck(); navigate("/register");}} className={classNames("register-button",`${props.styleBtnSize}`,`${props.styleBtn}`)}>SIGN UP</button>
}