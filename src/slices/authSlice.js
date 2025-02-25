import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_uri, token_uri, redirect_uri, client_id } from "../config.json"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_API_BASE_URL;
import toasts from "../utils/toasts";
import { getCookie, removeCookie, setCookie } from "../utils/Cookies";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        access_token: getCookie("access_token") || null,
        user: getCookie("user") || null,
        code_challenge_method: "S256",
        error: null
    },
    reducers: {
        saveCodeChallengeAndVerifier(state, { payload }) {
            const { code_challenge, code_verifier } = payload;
            Cookies.set("challenge", JSON.stringify(payload));
            state = {
                ...state,
                code_challenge: code_challenge,
                code_verifier: code_verifier
            }
            return state;
        },
        logout(state, action) {
            removeCookie("user");
            removeCookie("access_token");
            state = {
                ...state,
                user: null,
                access_token: null
            }
            toasts.successToast("Logged out successfully.")
            return state;
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchAccessToken.fulfilled, (state, { payload }) => {
                // decode id_token to set user
                // const { email = null, profile = null, name = null } = jwtDecode(payload.id_token);
                // const { exp } = jwtDecode(payload.access_token);
                // const user = { email, profile, name };
                // const access_token = payload.access_token;
                // // set user to cookie
                // // Cookies.set("user", JSON.stringify(user));
                // // // set access_token to cookie
                // // Cookies.set("access_token", access_token);
                // // //remove challenge
                // // Cookies.remove("challenge");
                // // set in state

                // setCookie("user", user, { expires: exp });
                // setCookie("access_token", access_token, { expires: exp });
                // removeCookie("challenge");
                state = {
                    ...state,
                    user: payload.user,
                    access_token: payload.access_token,
                    error: null
                };
                return state;
            })
            .addCase(fetchAccessToken.rejected, (state, { payload }) => {
                state.error = payload;
                return state;
            })
    }
})

export const fetchAccessToken = createAsyncThunk("auth/fetchAccessToken", async (code, { rejectWithValue }) => {
    try {
        const challenge = JSON.parse(Cookies.get("challenge"));
        const code_verifier = challenge?.code_verifier
        const body = {
            code,
            code_verifier,
            redirect_uri,
            client_id,
            grant_type: "authorization_code",
        }
        const uriEncodedBody = new URLSearchParams(body);
        const response = await fetch(`${base_uri}${token_uri}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: uriEncodedBody.toString()
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message);
        }
        toasts.successToast(data?.message ?? "Access token fetched successfully.");

        //reterive data
        const { email = null, profile = null, name = null } = jwtDecode(data.id_token);
        const { exp } = jwtDecode(data.access_token);
        const user = { email, profile, name };
        const access_token = data.access_token;
        const expiryDate = new Date(exp * 1000);
        setCookie("user", user, { expires: expiryDate });
        setCookie("access_token", access_token, { expires: expiryDate });
        removeCookie("challenge");

        return { user, access_token };
    } catch (error) {
        toasts.errorToast(error.message)
        return rejectWithValue(error.message);
    }
})


export const registerUser = async (formData) => {
    try {
        const user = {
            name: formData.username,
            email: formData.email,
            password: formData.password,
            profile: ""
        }
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message);
        }
        toasts.successToast(data?.message);
        return data;
    } catch (error) {
        toasts.errorToast(error?.message);
    }
}
export const { saveCodeChallengeAndVerifier, logout } = authSlice.actions;

export default authSlice.reducer;