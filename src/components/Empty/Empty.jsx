import Icon from "@mdi/react";
import "./Empty.css";
import { mdiDeleteEmpty } from "@mdi/js";
export default function Empty({message=null}){
    return (
        <div className="empty-cart-container">
            <div className="empty-cart-card">
                <div className="empty-cart-circle">
                    <Icon className="icon" path={mdiDeleteEmpty} />
                </div>
                <h1>Empty!</h1> 
                {message}
            </div>
        </div>
    )
}