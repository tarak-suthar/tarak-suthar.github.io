import { mdiStar } from "@mdi/js"
import { Icon } from "@mdi/react"
import "./Ratings.css"
import classNames from "classnames";
export default function Ratings({ rating, maxRating }){
    return (
        new Array(maxRating).fill(0).map((_,index)=>{
            let isActive = (rating-1) >= index;
            return(
                <Icon key={index} className={classNames("product-rating-star",{
                    "product-rating-star-yellow": isActive
                })} path={mdiStar} />
            )
        })
    )
    
}