import Cookies from "js-cookie";

export function getCookie(name) {
    const data = Cookies.get(name);
    if (name == "access_token") return data;
    return JSON.parse(data ?? null);
}


export function setCookie(name, data, options = {}) {
    if (name == null || data == null) return;
    Cookies.set(name, JSON.stringify(data), {
        ...options
    });
}


export function removeCookie(name) {
    Cookies.remove(name);
}