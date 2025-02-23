import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        isLoading: false,
        wishlist: {},
        error: null
    },
    reducers: {
        toggleWishlist(state, { payload }) {
            const productId = payload ?? null;
            if (productId != null) {
                const currentState = state.wishlist[productId] ?? false;
                const updateTo = Boolean(true - currentState);
                state = {
                    ...state,
                    wishlist: {
                        ...state.wishlist,
                        [productId]: updateTo
                    }
                }

            }
            return state;
        }
    },
    extraReducers: (builder) => {

    }

})

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;