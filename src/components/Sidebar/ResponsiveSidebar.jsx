import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiHome, mdiShape, mdiCart, mdiPackageVariant, mdiAccount } from '@mdi/js';
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
        { path: '/', icon: mdiHome, label: 'Home' },
        { path: '/categories', icon: mdiShape, label: 'Category' }, // Assuming route exists or placeholder
        { path: '/cart', icon: mdiCart, label: 'Cart', action: 'auth' },
        { path: '/orders', icon: mdiPackageVariant, label: 'Orders', action: 'auth' },
        { path: '/wishlist', icon: mdiAccount, label: 'Profile' }, // Wishlist/Profile
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
                                <Icon path={item.icon} size={1.2} className="card-icon" />
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
