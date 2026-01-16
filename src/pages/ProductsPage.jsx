import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, searchProdcuts } from "../slices/productsSlice";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/loader";
import "./ProductsPage.css";
import useProductFilters from "../hooks/useProductFilters";

export default function ProductsPage() {
    const { query, size, sortBy, direction, page } = useProductFilters();
    const productsFromStore = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);
    const dispatch = useDispatch();

    const [sampleProducts, setSampleProducts] = useState([]);

    useEffect(() => {
        // Fetch sample products for demonstration
        fetch("/products.json")
            .then(res => res.json())
            .then(data => setSampleProducts(data))
            .catch(err => console.error("Failed to load sample products:", err));

        if (query) dispatch(searchProdcuts({ query, size, sortBy, direction, page: page - 1 }))
        else dispatch(fetchProducts({ size, sortBy, direction, page: page - 1 }))
    }, [query, size, sortBy, direction, page, dispatch])

    const displayProducts = productsFromStore?.length > 0 ? productsFromStore : sampleProducts;

    return (
        <div className="page-container">
            <div className="products-container">
                {isLoading ? (
                    <Loader />
                ) : (
                    displayProducts?.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    )
}

