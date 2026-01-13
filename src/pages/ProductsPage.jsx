import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, searchProdcuts } from "../slices/productsSlice";
import { useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/loader";
import "./ProductsPage.css";
import Filter from "../components/Filter";
import useProductFilters from "../hooks/useProductFilters";
import Pagination from "../components/Pagination";



import Search from "../components/Search/Search";

export default function ProductsPage() {
    const { query, size, sortBy, direction, page } = useProductFilters();
    const products = useSelector((state) => state.products.products);
    const pageObject = useSelector((state) => state.products.page);
    const isLoading = useSelector((state) => state.products.isLoading);
    const dispatch = useDispatch();

    // Mock recent searches for demo/verification
    const recentSearches = ["Search product or category...", "iphone 12 pro max", "Electronics"];

    useEffect(() => {
        if (query) dispatch(searchProdcuts({ query, size, sortBy, direction, page: page - 1 }))
        else dispatch(fetchProducts({ size, sortBy, direction, page: page - 1 }))
    }, [query, size, sortBy, direction, page])

    const handleSearch = (val) => {
        // Integrate with existing search logic if needed, or just log for now
        console.log("Search query:", val);
        // Note: Real integration might require dispatching an action or updating URL params
    };

    return (
        <div className="prodcuts-page-container">
            <Search
                placeholder="Search product or category..."
                recentSearches={recentSearches}
                onSearch={handleSearch}
            />
            {/* <Filter /> */}
            <div className="products-container">
                {isLoading ?
                    <Loader />
                    : products?.map(product => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
            {/* <Pagination page={pageObject} /> */}
        </div>
    )
}

