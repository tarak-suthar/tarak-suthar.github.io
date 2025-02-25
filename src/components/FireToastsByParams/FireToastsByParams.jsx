import { useEffect } from "react";
import { useSearchParams } from "react-router";
import toasts from "../../utils/toasts";

export default function FireToastsByParams({children}){
    const [queryParams,setQueryParams] = useSearchParams();
    const loggedIn = Boolean(queryParams.get("logged-in") ?? false);
    const verified = Boolean(queryParams.get("verified") ?? false);

    useEffect(()=>{
        if(loggedIn){
            toasts.successToast("Logged-In Successfully.")
            setQueryParams((params) =>{
                params.delete("logged-in");
            })
        } 
        if(verified){
            toasts.successToast("Email Verfied Successfully. Continue Log-In.")
            setQueryParams((params)=>{
                params.delete("verified");
            })
        } 
    },[loggedIn,verified])

    return children;
}