import { getCookie } from "./Cookies";

export function requireAuth(action, toggleModal, navigate) {
    const user = getCookie("user");
    if (!user) toggleModal();
    else action();
}