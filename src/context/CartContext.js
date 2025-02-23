import { createContext } from "react";

const CartContext = createContext({
    cart: {},
    incrementQty: function () { },
    decrementQty: function () { }
})

export default CartContext;