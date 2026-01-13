import { useContext } from "react";
import LoginRegisterBar from "../LoginRegisterBar";
import "./Sidebar.css";
import SidebarContext from "../../context/SidebarContext";
import ProfileBar from "../ProfileBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate, useLocation } from "react-router";
import { requireAuth } from "../../utils/authUtils";
import useLoginRegisterModal from "../../hooks/useLoginRegisterModal";

export default function Sidebar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleModal } = useLoginRegisterModal();

    const { unCheck } = useContext(SidebarContext)
    function unCheckHandler(event) {
        if (event.target === event.currentTarget) {
            unCheck();
        }
    }

    function handleLogout() {
        dispatch(logout());
    }

    function handleOpenCart() {
        requireAuth(() => navigate("/cart"), toggleModal, navigate)
    }

    return (
        <section onClick={unCheckHandler} className="sidebar-container">
            <div className="sidebar">
                <ul className="unordered-list">
                    <li>
                        {user ? <ProfileBar user={user} /> : <LoginRegisterBar />}
                    </li>
                    <li className="list-item">
                        <a
                            className={location.pathname === "/" ? "active" : ""}
                            onClick={() => navigate("")}
                        >Home</a>
                    </li>
                    <li className="list-item">
                        <a
                            className={location.pathname === "/wishlist" ? "active" : ""}
                            onClick={() => navigate("/wishlist")}
                        >Wishlist</a>
                    </li>
                    <li className="list-item">
                        <a
                            className={location.pathname === "/cart" ? "active" : ""}
                            onClick={handleOpenCart}
                        >Cart</a>
                    </li>
                    <li className="list-item contact">
                        <a href="mailto:suthartarak@gmail.com">Contact</a>
                    </li>
                    {user && <li className="list-item">
                        <div><button onClick={handleLogout} className="logout-button">Logout</button></div>
                    </li>
                    }
                </ul>
            </div>
        </section>
    )
}