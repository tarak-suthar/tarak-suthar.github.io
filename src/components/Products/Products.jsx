import ProductCard from "../ProductCard"
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { fetchProducts } from "../../slices/productsSlice";


export default function Products() {
    // let [products,setProducts] = useState([]);
    const dispatch = useDispatch();
    // let { isLoading, products, error } = useSelector((state)=>state.products);

    useEffect(()=>{
        // fetchProducts();
        // dispatch(fetchProducts());
    },[]);

    // async function fetchProducts(){
    //     console.log("api call started...");
    //     let response = await fetch('http://localhost:8080/products');
    //     let data = await response.json();
    //     let productList = data.map(row =>{ 
    //         return {...row,quantity:0,rating:4};
    //     })
    //     console.log(productList);
    //     setProducts(productList);
    //     console.log("use effect end")
    // }
    

    // return (
    //     <div>
    //         {isLoading?<Loader/>:null}
    //         <Link to={"/cart"}>Cart</Link>
    //         <h3>Product List</h3>
    //         { 
    //         // products.length > 0 ? 
    //         products?.map(product=> <ProductCard product={product} key={product.id}/> ?? <h2>no products to display</h2>) 
    //         // : <div><img src={loader} alt="loader" /></div>
    //         }
    //     </div>
    // )

    let products = new Array(10).fill(0);

    return (
        <div>
            {
                products.map((p) => <ProductCard/>)
            }
        </div>
    )
}