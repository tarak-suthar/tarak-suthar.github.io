import "./Header.css";
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router";
import { mdiCartVariant, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import SidebarContext from "../../context/SidebarContext";
import { getCookie } from "../../utils/Cookies";
import useLoginRegisterModal from "../../hooks/useLoginRegisterModal";
import { requireAuth } from "../../utils/authUtils";


export default function Header() {
    const cart = useSelector(state => state.cart);
    const { toggleModal } = useLoginRegisterModal();
    const count = Object.keys(cart).length;
    const navigate = useNavigate();

    const { toggleSidebar } = useContext(SidebarContext);

    function handleOpenCart() {
        requireAuth(() => navigate("/cart"), toggleModal, navigate);
    }

    return (
        <header className="navbar">
            <div className="header-container">
                <div className="logo-section">
                    <span className="hamburger-menu" onClick={toggleSidebar}>
                        <Icon path={mdiMenu} size={1.2} />
                    </span>
                    <div onClick={() => navigate("/")} className="logo">
                        <h1>Shopping</h1>
                    </div>
                </div>
                <div className="profile">
                    <span onClick={handleOpenCart} className="cart-icon">
                        <Icon path={mdiCartVariant} size={1.2} />
                        {count > 0 && <span className="cart-item-count">{count}</span>}
                    </span>
                </div>
            </div>
        </header>
    )
}