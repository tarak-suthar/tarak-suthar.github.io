import { useSelector } from "react-redux"
import ProductCard from "../components/ProductCard";
import "./ProductsPage.css";
import Empty from "../components/Empty";

export default function WishlistPage(){
    const products = useSelector((state)=>state.products.products);
    const wishlist = useSelector(state=> state.wishlist.wishlist);
    return (
        <div className="wishlist-container">
            <h1 className="wishlist-title">Wishlist</h1>
            <div className="products-container">
                {Object.keys(wishlist).length > 0? products?.map(product=>{
                    if(wishlist[product.id]) return <ProductCard key={product.id} product={product} />
                }) : <Empty/>}
            </div>
        </div>
    )
}