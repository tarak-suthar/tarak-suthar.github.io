import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../slices/wishlistSlice';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import Icon from '@mdi/react';
import toasts from '../../utils/toasts';
import AddToCart from '../AddToCart/AddToCart';
import './ProductDetails.css';

const ProductDetails = ({ product }) => {
    const dispatch = useDispatch();
    const isWishlistActive = useSelector((state) =>
        product ? state.wishlist.wishlist[product.id] : false
    ) ?? false;

    if (!product) return null;

    const {
        id,
        title,
        price,
        oldPrice,
        description,
        img,
        discount,
        specifications = []
    } = product;

    const handleWishlistToggle = () => {
        dispatch(toggleWishlist(id));
        if (!isWishlistActive) {
            toasts.successToast("Added to Wishlist");
        }
    };

    return (
        <div className="product-details">
            <div className="product-details-gallery">
                <div className="product-details-image-container">
                    {discount && <span className="product-details-badge">{discount}%</span>}
                    <img src={img} alt={title} className="product-details-image" />
                </div>
            </div>

            <div className="product-details-info">
                <h1 className="product-details-title">{title}</h1>

                <div className="product-details-price-container">
                    <span className="product-details-price">${price?.toLocaleString()}</span>
                    {oldPrice && (
                        <span className="product-details-old-price">${oldPrice.toLocaleString()}</span>
                    )}
                </div>

                <section className="product-details-description-section">
                    <h3 className="section-title">Description</h3>
                    <p className="product-details-description">{description}</p>
                </section>

                {specifications.length > 0 && (
                    <section className="product-details-specs-section">
                        <h3 className="section-title">Specifications</h3>
                        <ul className="specs-list">
                            {specifications.map((spec, index) => (
                                <li key={index} className="spec-item">
                                    <span className="spec-label">{spec.label}:</span>
                                    <span className="spec-value">{spec.value}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <div className="product-details-actions-group">
                    <div className="primary-action">
                        <AddToCart product={product} />
                    </div>
                    <button
                        className={`wishlist-btn-secondary ${isWishlistActive ? 'active' : ''}`}
                        onClick={handleWishlistToggle}
                        aria-label={isWishlistActive ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <Icon
                            path={isWishlistActive ? mdiHeart : mdiHeartOutline}
                            size={0.8}
                            color={isWishlistActive ? "var(--color-primary)" : "currentColor"}
                        />
                        <span>{isWishlistActive ? "Wishlisted" : "Add to Wishlist"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
