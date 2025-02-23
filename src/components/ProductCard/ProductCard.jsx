import { memo, useContext, useDebugValue, useEffect, useRef } from "react";
import AddToCart from "../AddToCart";
import Ratings from "../Ratings";
import "./ProductCard.css";
import { mdiCartOutline, mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../slices/wishlistSlice";
import toasts from "../../utils/toasts";
import { increaseProductQty } from "../../slices/cartSlice";
import { requireAuth } from "../../utils/authUtils";
import { getCookie } from "../../utils/Cookies";
import useLoginRegisterModal from "../../hooks/useLoginRegisterModal";



export default memo(function ProductCard({ product }){
    const dispatch = useDispatch();
    const wishlistRef = useRef(null);
    const isActive = useSelector((state)=>state.wishlist.wishlist[product.id]) ?? false;
    const {toggleModal} = useLoginRegisterModal();
    function handleWishlistToggle(){
        dispatch(toggleWishlist(product.id))
    }

    function handleAddToCart(){
        // dispatch add to cart api with user id
        const user = getCookie("user");
        if(!user) toggleModal();
        else{
            dispatch(increaseProductQty(product))
            toasts.successToast("Added to Cart.")
        }
    }

    useEffect(()=>{
        wishlistRef.current.checked =isActive;
    },[isActive])

    return (
        <article className="product-card">
            <div className="card__img">
                <img src={product.img} alt="" />
            </div>
            <div className="card__name">
                <p>{product.title}</p>
            </div>
            <div className="card__precis">
                <input type="checkbox" ref={wishlistRef} name="heart" className="heart-checkbox" hidden/>
                <label onClick={handleWishlistToggle} className="card__icon"><Icon className="heart" path={mdiHeartOutline} size={2}/></label>
                <div>
                    <span className="card__preci card__preci--before">INR.{product.price+200}</span>
                    <span className="card__preci card__preci--now">INR.{product.price}</span>
                </div>
                <span onClick={handleAddToCart} className="card__icon"><Icon className="cart" path={mdiCartOutline} size={2}/></span>
            </div>
        </article>
    )
})