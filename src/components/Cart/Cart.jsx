import { useSelector } from "react-redux";
import "./Cart.css";
import Empty from "../Empty";
import CartItem from "../CartItem/CartItem";

export default function Cart(){

    const cart = useSelector(state => state.cart);
    const shipping=50;
    let subtotal = Object.keys(cart)
    .map(item => cart[item].price * cart[item].quantity)
    .reduce((acc,price) => acc+=price,0);
    const tax = parseFloat((subtotal * 0.05).toFixed(3));


    return (
       <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>

            {
                (Object.keys(cart).length > 0)? 
                    <div className="shopping-cart">

                        <div className="row">
                            <div className="heading">Image</div>
                            <div className="heading">Product</div>
                            <div className="heading">Price</div>
                            <div className="heading">Quantity</div>
                            <div className="heading">Remove</div>
                            <div className="heading">Total</div>
                        </div>

                        { Object.keys(cart).length>0? 
                            Object.keys(cart).map((productId) => <CartItem cartItem={cart[productId]}/>) : null
                        }



                        <div className="totals">
                            <div className="totals-item">
                            <label>Subtotal</label>
                            <div className="totals-value" id="cart-subtotal">{subtotal}</div>
                            </div>
                            <div className="totals-item">
                            <label>Tax (5%)</label>
                            <div className="totals-value" id="cart-tax">{tax}</div>
                            </div>
                            <div className="totals-item">
                            <label>Shipping</label>
                            <div className="totals-value" id="cart-shipping">{shipping}</div>
                            </div>
                            <div className="totals-item totals-item-total">
                            <label>Grand Total</label>
                            <div className="totals-value" id="cart-total">{subtotal + tax + shipping}</div>
                            </div>
                        </div>
            
                        <button className="checkout">Checkout</button>

                    </div>
                : <Empty/>   
            }
       </div>
    )
}