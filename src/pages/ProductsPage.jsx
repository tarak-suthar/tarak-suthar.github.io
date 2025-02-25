import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, searchProdcuts } from "../slices/productsSlice";
import { useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/loader";
import "./ProductsPage.css";
import Filter from "../components/Filter";
import useProductFilters from "../hooks/useProductFilters";
import Pagination from "../components/Pagination";



export default function ProductsPage(){
    const {query,size, sortBy, direction, page} = useProductFilters();
    const products = useSelector((state)=>state.products.products);
    const pageObject = useSelector((state)=>state.products.page);
    const isLoading = useSelector((state)=>state.products.isLoading);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(query) dispatch(searchProdcuts({query,size,sortBy,direction, page:page-1}))
        else dispatch(fetchProducts({size,sortBy,direction, page:page-1}))
    },[query,size,sortBy,direction, page])

    return (
        <div className="prodcuts-page-container">
            <Filter/>
            <div className="products-container">
                {   isLoading?
                        <Loader/>
                    :products?.map(product=>{
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
            <Pagination page={pageObject} />
        </div>
    )
}

