import { useDispatch, useSelector } from "react-redux";
import { increaseProductQty, decreaseProductQty } from "../../slices/cartSlice";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";
import "./AddToCart.css";

export default function AddToCart({ product }) {
    const dispatch = useDispatch();
    const quantity = useSelector((state) => state.cart[product.id] ? state.cart[product.id].quantity : 0);

    function increase() {
        dispatch(increaseProductQty(product));
    }

    function decrease() {
        dispatch(decreaseProductQty(product));
    }

    return (
        <div className="add-to-cart-container">
            {quantity === 0 ? (
                <button className="add-to-cart-btn" onClick={increase}>
                    <span className="plus-icon-wrapper">
                        <Icon path={mdiPlus} size={0.8} />
                    </span>
                    Add to cart
                </button>
            ) : (
                <div className="qty-control">
                    <button className="qty-btn" onClick={decrease}>
                        <Icon path={mdiMinus} size={0.8} />
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button className="qty-btn" onClick={increase}>
                        <Icon path={mdiPlus} size={0.8} />
                    </button>
                </div>
            )}
        </div>
    );
}