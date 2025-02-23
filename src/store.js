import { configureStore } from "@reduxjs/toolkit";
import cart from "./slices/cartSlice";
import products from "./slices/productsSlice";
import auth from "./slices/authSlice";
import wishlist from "./slices/wishlistSlice";

const store = configureStore({
    reducer: { cart, products, auth, wishlist }
})

export default store;