import "./LoginRegisterBar.css";
import LoginButton from "../LoginButton";
import RegisterButton from "../RegisterButton";

export default function LoginRegisterBar(){
    return(
        <div className="login-register-bar-container">
            <div className="login-register-bar">
                <div><RegisterButton styleBtnSize="bar-btn-size" styleBtn="bar-btn-style"/></div>
                <div><LoginButton styleBtnSize="bar-btn-size" styleBtn="bar-btn-style"/></div>
            </div>
        </div>
    )
}