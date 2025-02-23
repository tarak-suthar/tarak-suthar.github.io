import { useContext } from "react";
// import CartContext from "../../context/cartContext";
import { useDispatch, useSelector } from "react-redux";
import { increaseProductQty,decreaseProductQty } from "../../slices/cartSlice";
export default function AddToCart({product}){

    // const { cart, incrementQty, decrementQty } = useContext(CartContext);  // before used context
    const dispatch = useDispatch();

    let quantity = useSelector((state)=>state.cart[product.id]? state.cart[product.id].quantity : 0 );

    function increase(){
        // incrementQty(product); // context method
        dispatch(increaseProductQty(product));
    }

    function decrease(){
        // decrementQty(product); // context method
        dispatch(decreaseProductQty(product));
    }

    return(
        <div>
            { quantity==0?<button onClick={increase}>AddToCart</button>:
                <div>
                    <button onClick={decrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increase}>+</button>
                </div>
            }
        </div>
    )
}