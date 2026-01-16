import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('/products.json');
                const data = await response.json();
                const foundProduct = data.find(p => p.id === parseInt(id));
                setProduct(foundProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="page-container center-content"><div className="loader"></div></div>;

    return (
        <div className="page-container">
            <div className="page-content-wrapper">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Catalog
                </button>

                {product ? (
                    <ProductDetails product={product} />
                ) : (
                    <div className="not-found">
                        <h2>Product Not Found</h2>
                        <button className="back-button" onClick={() => navigate('/')}>Return to Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
