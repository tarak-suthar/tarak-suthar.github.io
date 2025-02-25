import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { useEffect } from "react";
import { fetchAccessToken } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CallbackPage(){
    const location = useLocation();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const user = useSelector((state)=>state.auth.user);
    
    useEffect(()=>{
        const code = queryParams.get('code');
        if(!user && code){
            dispatch(fetchAccessToken(code));
        } 
        else closeAndBackToHome();
    },[user])


    return(
        <div>
            <Loader/>
        </div>
    )

}


function closeAndBackToHome(){
    window?.opener?.location?
    window.opener.location.href = "/?logged-in=true" 
    : window.location.href="/logged-in=true"; // Redirect the previous tab to home or desired route
    window.close(); // Close the current tab
}