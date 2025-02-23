import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {},
    reducers: {
        increaseProductQty(state, action) {
            const product = action.payload;
            if (!state?.[product.id]) state[product.id] = { ...product, quantity: 1 };
            else {
                state[product.id].quantity++;
            }
            console.log("in side inc action");
        },
        decreaseProductQty(state, action) {
            const product = action.payload;
            state[product.id].quantity--;
            if (state[product.id].quantity <= 0) { // delete product
                delete state[product.id];
            }
            console.log("in side dec action");
        }

    }
})

export const { increaseProductQty, decreaseProductQty } = cartSlice.actions;

export default cartSlice.reducer;