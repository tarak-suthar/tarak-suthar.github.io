
import { useEffect } from "react";
import useFormState from "../../hooks/useFormState"
import { registerUser } from "../../slices/authSlice";
import "./Register.css";
import { useDispatch } from "react-redux";
import Loader from "../loader";
import SuccessCard from "../SuccessCard";
import { Link } from "react-router";

export default function Register(){    

    const {state, isPending, formAction, error} = useFormState(null,register);
    async function register(formData){
            const password = formData.password;
            const confirmPassword = formData.confirm_password;
            if(password.localeCompare(confirmPassword) != 0) throw new Error("Confirm password doesn't match the password");
            // dispatch register
            const data = await registerUser(formData);
           return  data;
    }

    return(
        <div className="register-container">
        {state ?
            <SuccessCard message={<p> Successfully Registered. <br/>Verify Email to <Link to={"/login"}>Login</Link></p>}/>
        :   
                <form className="register-form" onSubmit={formAction}>
                    <input type="text" name="username" placeholder="Username" required/>
                    <input type="text" name="email" placeholder="Email" required/>
                    <input type="password" name="password" minLength={6} maxLength={50} placeholder="Password" required/>
                    <input type="password" name="confirm_password" minLength={6} maxLength={50} placeholder="confirm Password" required/>
                    <button type="submit">Register</button>
                    {isPending && <Loader/>}
                </form>
        }
        </div>
    )
}


