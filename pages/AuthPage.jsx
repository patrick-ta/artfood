import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword";
import useLogin from "../hooks/useLogin";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const AuthPage = () => {
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const {signUp} = useSignUpWithEmailAndPassword();
    const {login} = useLogin();
    const [user] = useAuthState(auth);

    const navigate = useNavigate()  

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    useEffect(() => {
        if (user) {
        navigate("/home");
        }
    }, [user]);

    return (
        <>
        <div className="flex justify-center w-full h-screen bg-no-repeat bg-cover bg-[url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25abe526-6c4c-4aa4-a7c3-79061e53b38a/dhzp6kb-b2a007ad-c76f-48f6-adc5-5ef1c1a05a7b.jpg/v1/fill/w_1176,h_680,q_70,strp/after_the_rain_by_refiend_dhzp6kb-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjIyMCIsInBhdGgiOiJcL2ZcLzI1YWJlNTI2LTZjNGMtNGFhNC1hN2MzLTc5MDYxZTUzYjM4YVwvZGh6cDZrYi1iMmEwMDdhZC1jNzZmLTQ4ZjYtYWRjNS01ZWYxYzFhMDVhN2IuanBnIiwid2lkdGgiOiI8PTM4NDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.saLNQaJ5tccm5aZs7C867Q1MxaqedxB0Ux77r6fCRR4)]">
            <div className="mt-40 flex flex-col justify-center px-6 py-12 w-100 h-150 bg-gray-100 rounded-xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-2 text-center text-4xl tracking-wider font-semibold text-blue-800">Artfood</h1>
                    <h2 className="mt-3 text-center text-2xl tracking-tight font-light">Sign in to your account</h2>
                </div>

                <hr className="mt-5 mb-5 border-gray-400"/>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm/6 font-medium tracking-wide">Email address</label>
                            <div className="mt-2">
                                <input id="email" type="email" name="email" required className="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" 
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
                            </div>
                        </div>
                        {isSignUpActive && <div>
                            <label className="block text-sm/6 font-medium tracking-wide">Username</label>
                            <div className="mt-2">
                                <input id="username" type="text" name="username" required className="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" 
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
                            </div>
                        </div>}
                        <div>
                            <label className="block text-sm/6 font-medium tracking-wide">Password</label>
                            <div className="mt-2">
                                <input id="password" type="password" name="password" required className="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" 
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            {isSignUpActive && <button type="button" className="w-full rounded-xl bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-800"
                            onClick={() => signUp(inputs)}>Sign up</button>}

                            {!isSignUpActive && 
                            <button type="button" className="w-full rounded-xl bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-800"
                            onClick={() => {login(inputs);}}>Log in</button>}
                            

                            {isSignUpActive && <button onClick={handleMethodChange} className="mt-4 w-full rounded-xl bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold hover:bg-gray-300">Already have an account?</button>}
                            {!isSignUpActive && <button onClick={handleMethodChange} className="mt-4 w-full rounded-xl bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold hover:bg-gray-300">Create an account</button>}

                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AuthPage