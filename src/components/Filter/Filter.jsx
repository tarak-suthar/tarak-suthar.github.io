import { useEffect, useState } from "react"
import "./Filter.css";
import { useLocation } from "react-router";
import Icon from "@mdi/react";
import { mdiSort } from "@mdi/js";
import useProductFilters from "../../hooks/useProductFilters";
import debounce from "../../utils/debounce";

export default function Filter(){

    const { query, pageSize, sortBy, direction, setFilters, resetFilters} = useProductFilters();
    const [search,setSearch] = useState(query);
    let sortValue = "";
    if(sortBy == "price"){
        if(direction == "DESC") sortValue = "PRICE_HIGH_TO_LOW";
        else sortValue = "PRICE_LOW_TO_HIGH";
    }
    useEffect(()=>{
        setFilters({query:search})
    },[search])
    const debouncedSearch = debounce(setSearch,800);

    return (
        <div className="filter-container">
            <div className="filters">
                    <div className="row-1">
                        <input type="search" defaultValue={search} onChange={(e)=>debouncedSearch(e?.target?.value)} name="query" placeholder="Search" />
                    </div>
                    <div className="row-2">
                        <div className="count-container">
                            <label className="count" htmlFor="pageSize">
                                <select id="pageSize" name="pageSize" value={pageSize} onChange={(e)=>setFilters({pageSize:e?.target?.value})} required>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className="select" htmlFor="sort">
                                <select id="sort" name="sort" value={sortValue} onChange={(e)=>{
                                    let value = e?.target?.value;
                                    if(value == "PRICE_HIGH_TO_LOW"){
                                        setFilters({sortBy:"price",direction:"DESC"})
                                    }else if(value = "PRICE_LOW_TO_HIGH"){
                                        setFilters({sortBy:"price",direction:"ASC"})
                                    }
                                }} required>
                                    <option value="" disabled>Sort By</option>
                                    <option value="PRICE_HIGH_TO_LOW">Highest Price First</option>
                                    <option value="PRICE_LOW_TO_HIGH">Lowest Price First</option>
                                </select>
                                <svg>
                                    <use xlinkHref="#select-arrow-down"></use>
                                </svg>
                            </label>
                            <svg className="sprites">
                                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                    <polyline points="1 1 5 5 9 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                        <button onClick={()=>resetFilters()} className="flt-btn">Reset</button>
                    </div>
            </div>
            {/* <select name="product-filters" required>
                <option value="" disabled selected>Select Filter</option>
                
                </select> */}
            <span className="filter-icon">
                <Icon path={mdiSort} size={2}/>
            </span>
        </div>
    )
}
