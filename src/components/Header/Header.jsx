import "./Header.css";
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router";
import { mdiCartVariant } from "@mdi/js";
import Icon from "@mdi/react";
import { useSelector } from "react-redux";
import { getCookie } from "../../utils/Cookies";
import useLoginRegisterModal from "../../hooks/useLoginRegisterModal";
import { requireAuth } from "../../utils/authUtils";


export default function Header(){
    const cart = useSelector(state => state.cart);
    const {toggleModal}  = useLoginRegisterModal();
    const count = Object.keys(cart).length;
    const navigate = useNavigate();

    function handleOpenCart(){
        requireAuth(()=>navigate("/cart"),toggleModal,navigate);
    }

    return(
        <div className="navbar">
            <div onClick={()=>navigate("/")} className="logo">
                <img src={logo} alt="Shopping" />
                <h1>Shopping</h1>
            </div>
            <div className="profile">
                <span onClick={handleOpenCart} className="cart-icon">
                    <Icon path={mdiCartVariant} size={3}/>
                    <span className="cart-item-count">{count}</span>
                </span>
            </div> 
        </div>
    )
}