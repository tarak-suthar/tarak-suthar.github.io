import { setCookie } from "../utils/Cookies";
import config from "../config.json"

function dec2hex(dec) {
    let t = ('0' + dec.toString(16))
    return t.substring(t.length - 2);
}

function generateRandomString() {
    var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
}

function sha256(plain) { // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export async function generateCodeChallengeAndVerifier() {
    const code_verifier = generateRandomString();
    const hashed = await sha256(code_verifier);
    const code_challenge = base64urlencode(hashed);
    setCookie("challenge", { code_challenge, code_verifier })  // save in cookie
    return { code_challenge, code_verifier };
}

export async function constructOAuth2LoginUri() {
    const { code_challenge } = await generateCodeChallengeAndVerifier();
    return `${config.base_uri}:8080${config.auth_uri}?client_id=${config.client_id}&redirect_uri=${encodeURIComponent(config.redirect_uri)}&response_type=code&scope=${encodeURIComponent(config.scope)}&code_challenge=${code_challenge}&code_challenge_method=${config.code_challenge_method}&response_mode=query`;
}

