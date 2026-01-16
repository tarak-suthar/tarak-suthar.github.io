import { memo, useContext, useDebugValue, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AddToCart from "../AddToCart";
import Ratings from "../Ratings";
import "./ProductCard.css";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../slices/wishlistSlice";
import toasts from "../../utils/toasts";

export default memo(function ProductCard({ product }) {
    const dispatch = useDispatch();
    const isWishlistActive = useSelector((state) => state.wishlist.wishlist[product.id]) ?? false;

    function handleWishlistToggle(e) {
        e.stopPropagation();
        dispatch(toggleWishlist(product.id));
        if (!isWishlistActive) {
            toasts.successToast("Added to Wishlist");
        }
    }

    const hasDiscount = product.discount || product.oldPrice;
    const discountText = product.discount ? `${product.discount}%` : "Sale";
    const oldPrice = product.oldPrice || (product.price + 200);

    return (
        <article className="product-card">
            {hasDiscount && (
                <div className="card__badge">{discountText}</div>
            )}

            <button
                className={`card__wishlist ${isWishlistActive ? 'active' : ''}`}
                onClick={handleWishlistToggle}
                aria-label="Toggle Wishlist"
            >
                <Icon path={isWishlistActive ? mdiHeart : mdiHeartOutline} size={1} />
            </button>

            <Link to={`/product/${product.id}`} className="card__link">
                <div className="card__img-container">
                    <img src={product.img} alt={product.title} loading="lazy" />
                </div>

                <div className="card__content">
                    <h3 className="card__title">{product.title}</h3>

                    <div className="card__price-container">
                        <span className="card__price">${product.price.toLocaleString()}</span>
                        {hasDiscount && (
                            <span className="card__price--old">${oldPrice.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </Link>

            <div className="card__actions">
                <AddToCart product={product} />
            </div>
        </article>
    );
});