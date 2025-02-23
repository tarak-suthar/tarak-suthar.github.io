import config from "../../config.json"
import { constructOAuth2LoginUri } from "../../slices/authUtil";
import classNames from "classnames";
import "./LoginButton.css"

const LoginButton = (props) => {
  
 async function handler(){
      // const [code_challenge,code_verifier] = await generateCodeChallengeAndVerifier();
      // const targetUri = `${config.base_uri}${config.auth_uri}?client_id=${config.client_id}&redirect_uri=${encodeURIComponent(config.redirect_uri)}&response_type=code&scope=${encodeURIComponent(config.scope)}&code_challenge=${code_challenge}&code_challenge_method=${config.code_challenge_method}&response_mode=query`;
      const targetUri = await constructOAuth2LoginUri();
      window.open(targetUri,"_blank");
  }


  return <button className={classNames("login-button",`${props.styleBtnSize}`,`${props.styleBtn}`)} onClick={handler}>LOG IN</button>;
};

export default LoginButton;