import { useDispatch } from "react-redux"
import { decreaseProductQty } from "../../slices/cartSlice";

export default function CartItem({ cartItem }){

    const dispatch = useDispatch();

    function decreaseProductQtyHandler(cartItem){
        dispatch(decreaseProductQty(cartItem));
    }

    return (
        <div key={cartItem.id} className="row">
                                <div className="cell img">
                                    <div className="content">
                                        <img src={cartItem.img} alt="image"/>
                                    </div> 
                                </div>
                                <div className="cell discription">
                                    <div className="content">
                                        <div className="title">{cartItem.title}</div>
                                        <p className="description">{cartItem.discription}</p>
                                    </div> 
                                </div>
                                <div className="cell price">
                                    <div className="content">
                                        <span>{cartItem.price}</span>
                                    </div> 
                                </div>
                                <div className="cell">
                                    <div className="content">
                                        <input className="input-quantity" type="number" min={1} onChange={()=>{}} defaultValue={cartItem.quantity}/>
                                    </div> 
                                </div>
                                <div className="cell">
                                    <div className="content">
                                        <button className="cart-item-remove-btn" onClick={() =>decreaseProductQtyHandler(cartItem)}>Remove</button>
                                    </div> 
                                </div>
                                <div className="cell">
                                    <div className="content">
                                        <span>{cartItem.price * cartItem.quantity}</span>
                                    </div> 
                                </div>
                            </div>
    )
}