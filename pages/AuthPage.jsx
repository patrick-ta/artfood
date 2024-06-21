import { useState } from "react";
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword";
import useLogin from "../hooks/useLogin";

const AuthPage = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    //make sure to come back here and add error handling (or else)
    const {signUp} = useSignUpWithEmailAndPassword();
    const {login} = useLogin();

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    return (
    <>
    <form>
        <input type="text" placeholder="Email" onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
        <input type="password" placeholder="Password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>

        {isSignUpActive && <button type="button" onClick={() => signUp(inputs)}>Sign Up</button>}
        {!isSignUpActive && <button type="button" onClick={() => login(inputs)}>Login</button>}

        {isSignUpActive && <a onClick={handleMethodChange}>Already have an account?</a>}
        {!isSignUpActive && <a onClick={handleMethodChange}>Create an account</a>}
    </form>
    </>
    )
}

export default AuthPage
