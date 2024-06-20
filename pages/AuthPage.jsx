import { useState } from "react";
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword";

const AuthPage = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const {loading, error, signUp} = useSignUpWithEmailAndPassword();

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    return (
    <>
    <form>
        <input type="text" placeholder="Email" onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
        <input type="password" placeholder="Password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>

        {isSignUpActive && <button type="button" onClick={() => signUp(inputs)}>Sign Up</button>}
        {!isSignUpActive && <button type="button">Login</button>}

        {isSignUpActive && <a onClick={handleMethodChange}>Already have an account?</a>}
        {!isSignUpActive && <a onClick={handleMethodChange}>Create an account</a>}
    </form>
    </>
    )
}

export default AuthPage
