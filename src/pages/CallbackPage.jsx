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
    const error = useSelector((state)=>state.auth.error);
    
    useEffect(()=>{
        const code = queryParams.get('code');
        console.log(code,"code",user);
        if(!user && code){
            console.log("about to dispatch",user);
            dispatch(fetchAccessToken(code));
        } 
        else closeAndBackToHome();
    },[user])


    return(
        <div>
            {
                error?
                <p>{error}</p>:
                <Loader/>
            }
        </div>
    )

}


function closeAndBackToHome(){
    console.log("in else tab")
    window?.opener?.location?
    window.opener.location.href = "/" 
    : window.location.href="/"; // Redirect the previous tab to home or desired route
    window.close(); // Close the current tab
}