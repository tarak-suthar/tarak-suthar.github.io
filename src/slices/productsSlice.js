import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "./productApi";

const productSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        products: [],
        error: null,
        page: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, { payload }) => {
                state.isLoading = true;
                state.error = null;
                return state;
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.products = payload?.data?.content;
                state.page = payload?.data?.page;
                console.log(state.products, "after fulfilled")
                return state;
            })
            .addCase(fetchProducts.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
                return state
            })
    },
})

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (params, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const token = state.auth.access_token;
        console.log("token==========>", state.auth.access_token);
        console.log("in fetch products", params)
        let uri = productsApi.searchAll;
        if (Object.keys(params) != 0) {
            uri += "?";
            for (let key of Object.keys(params)) {
                if (params[key] != undefined || params[key] != null) uri += `${key}=${params[key]}&`;
            }
        }
        const response = await fetch(uri, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) throw new Error(data?.message);
        return data;
    } catch (error) {
        console.log("error", error);
    }
})

export default productSlice.reducer;
