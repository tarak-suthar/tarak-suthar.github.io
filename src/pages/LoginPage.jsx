
import { useEffect, useState } from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import Loader from "../components/loader/Loader";

export default function LoginPage(){
   
    return(
        <div>
        <h1>Login</h1>
        <LoginButton/>
        </div>
    )
}