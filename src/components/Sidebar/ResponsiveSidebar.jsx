import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import {
    mdiHome, mdiHomeOutline,
    mdiShape, mdiShapeOutline,
    mdiCart, mdiCartOutline,
    mdiReceipt, mdiReceiptOutline,
    mdiAccount, mdiAccountOutline,
    mdiHeart, mdiHeartOutline
} from '@mdi/js';
import './ResponsiveSidebar.css';
import SidebarContext from '../../context/SidebarContext';
import { logout } from '../../slices/authSlice';
import useLoginRegisterModal from '../../hooks/useLoginRegisterModal';

export default function ResponsiveSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isOpen, toggleSidebar, closeSidebar } = useContext(SidebarContext);
    const { toggleModal } = useLoginRegisterModal();

    const navItems = [
        { path: '/', icon: mdiHome, inactiveIcon: mdiHomeOutline, label: 'Home' },
        { path: '/categories', icon: mdiShape, inactiveIcon: mdiShapeOutline, label: 'Category' },
        { path: '/cart', icon: mdiCart, inactiveIcon: mdiCartOutline, label: 'Cart', action: 'auth' },
        { path: '/orders', icon: mdiReceipt, inactiveIcon: mdiReceiptOutline, label: 'Orders', action: 'auth' },
        { path: '/wishlist', icon: mdiHeart, inactiveIcon: mdiHeartOutline, label: 'Wishlist' },
        { path: '/profile', icon: mdiAccount, inactiveIcon: mdiAccountOutline, label: 'Profile' }
    ];

    const handleNavigation = (item) => {
        if (item.action === 'auth' && !user) {
            toggleModal();
            return;
        }
        navigate(item.path);
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        closeSidebar();
    };

    return (
        <React.Fragment>
            {/* Overlay for mobile */}
            <div
                className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                onClick={closeSidebar}
            />

            <aside className={`responsive-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-cards-container">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <div
                                key={index}
                                className={`sidebar-card ${isActive ? 'active' : ''}`}
                                onClick={() => handleNavigation(item)}
                            >
                                {isActive && <div className="active-dot"></div>}
                                <Icon
                                    path={isActive ? item.icon : item.inactiveIcon}
                                    size={1.2}
                                    className="card-icon"
                                />
                                <span className="card-label">{item.label}</span>
                            </div>
                        );
                    })}

                    {user && (
                        <div className="sidebar-card logout" onClick={handleLogout}>
                            <span className="card-label">Logout</span>
                        </div>
                    )}
                </div>
            </aside>
        </React.Fragment>
    );
}
