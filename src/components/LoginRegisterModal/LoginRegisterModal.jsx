import { mdiClose, mdiGoogle } from "@mdi/js";
import Icon from "@mdi/react";
import useLoginRegisterModal from "../../hooks/useLoginRegisterModal";
import { useNavigate } from "react-router-dom";
import { constructOAuth2LoginUri } from "../../slices/authUtil";
import { useContext } from "react";
import SidebarContext from "../../context/SidebarContext";
import "./LoginRegisterModal.css";

export default function LoginRegisterModal() {
    const { isOpen, toggleModal } = useLoginRegisterModal();
    const navigate = useNavigate();
    const { unCheck } = useContext(SidebarContext);

    if (!isOpen) return null;

    const handleLogin = async () => {
        const targetUri = await constructOAuth2LoginUri();
        window.open(targetUri, "_blank");
        toggleModal();
    };

    const handleSignup = () => {
        unCheck();
        navigate("/register");
        toggleModal();
    };

    const handleGoogleLogin = () => {
        // Since we are requested to keep only google, but current implementation 
        // uses a single OAuth2 URI, we'll use handleLogin for now or a specific one if available.
        handleLogin();
    };

    return (
        <div className="lr-modal-overlay" onClick={toggleModal}>
            <div className="lr-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* <button className="lr-modal-close" onClick={toggleModal}>
                    <Icon path={mdiClose} size={1} />
                </button> */}

                <div className="lr-modal-actions">
                    <button className="lr-btn lr-btn-primary" onClick={handleLogin}>
                        LOG IN
                    </button>

                    <button className="lr-btn lr-btn-secondary" onClick={handleSignup}>
                        SIGN UP
                    </button>

                    <div className="lr-social-actions">
                        <button className="lr-social-btn" onClick={handleGoogleLogin}>
                            <Icon path={mdiGoogle} size={1} className="lr-google-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}