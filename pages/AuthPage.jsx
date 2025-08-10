import { useState } from "react";
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword";
import useLogin from "../hooks/useLogin";

const AuthPage = () => {
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
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
        <div class="flex justify-center w-full h-screen bg-no-repeat bg-cover bg-[url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25abe526-6c4c-4aa4-a7c3-79061e53b38a/dhzp6kb-b2a007ad-c76f-48f6-adc5-5ef1c1a05a7b.jpg/v1/fill/w_1176,h_680,q_70,strp/after_the_rain_by_refiend_dhzp6kb-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjIyMCIsInBhdGgiOiJcL2ZcLzI1YWJlNTI2LTZjNGMtNGFhNC1hN2MzLTc5MDYxZTUzYjM4YVwvZGh6cDZrYi1iMmEwMDdhZC1jNzZmLTQ4ZjYtYWRjNS01ZWYxYzFhMDVhN2IuanBnIiwid2lkdGgiOiI8PTM4NDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.saLNQaJ5tccm5aZs7C867Q1MxaqedxB0Ux77r6fCRR4)]">
            <div class="mt-40 flex flex-col justify-center px-6 py-12 w-100 h-150 bg-gray-100 rounded-xl">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 class="mt-2 text-center text-4xl tracking-wider font-semibold text-blue-800">Artfood</h1>
                    <h2 class="mt-3 text-center text-2xl tracking-tight font-light">Sign in to your account</h2>
                </div>

                <hr class="mt-5 mb-5 border-gray-400"/>

                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6">
                        <div>
                            <label class="block text-sm/6 font-medium tracking-wide">Email address</label>
                            <div class="mt-2">
                                <input id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" 
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
                            </div>
                        </div>
                        {isSignUpActive && <div>
                            <label class="block text-sm/6 font-medium tracking-wide">Username</label>
                            <div class="mt-2">
                                <input id="username" type="text" name="username" required autocomplete="username" class="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" 
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
                            </div>
                        </div>}
                        <div>
                            <label class="block text-sm/6 font-medium tracking-wide">Password</label>
                            <div class="mt-2">
                                <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" 
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center items-center">
                            {isSignUpActive && <button type="button" class="w-full rounded-xl bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-800"
                            onClick={() => signUp(inputs)}>Sign up</button>}
                            {!isSignUpActive && <button type="button" class="w-full rounded-xl bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-800"
                            onClick={() => login(inputs)}>Sign in</button>}
                            

                            {isSignUpActive && <button onClick={handleMethodChange} class="mt-4 w-full rounded-xl bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold hover:bg-gray-300">Already have an account?</button>}
                            {!isSignUpActive && <button onClick={handleMethodChange} class="mt-4 w-full rounded-xl bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold hover:bg-gray-300">Create an account</button>}

                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

    return (
    <>
        <form>
            <input type="text" placeholder="Email" onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
            {isSignUpActive && <input type="text" placeholder="Username" onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>}
            <input type="password" placeholder="Password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>

            {isSignUpActive && <button type="button" onClick={() => signUp(inputs)}>Sign Up</button>}
            {!isSignUpActive && <button type="button" onClick={() => login(inputs)}>Login</button>}

            {isSignUpActive && <a onClick={handleMethodChange}>Already have an account?</a>}
            {!isSignUpActive && <a onClick={handleMethodChange}>Create an account</a>}
        </form>
    </>
    )

    return (
        <>
        <div class="flex justify-center w-full h-screen bg-no-repeat bg-cover bg-[url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25abe526-6c4c-4aa4-a7c3-79061e53b38a/dhzp6kb-b2a007ad-c76f-48f6-adc5-5ef1c1a05a7b.jpg/v1/fill/w_1176,h_680,q_70,strp/after_the_rain_by_refiend_dhzp6kb-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjIyMCIsInBhdGgiOiJcL2ZcLzI1YWJlNTI2LTZjNGMtNGFhNC1hN2MzLTc5MDYxZTUzYjM4YVwvZGh6cDZrYi1iMmEwMDdhZC1jNzZmLTQ4ZjYtYWRjNS01ZWYxYzFhMDVhN2IuanBnIiwid2lkdGgiOiI8PTM4NDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.saLNQaJ5tccm5aZs7C867Q1MxaqedxB0Ux77r6fCRR4)]">
            <div class="mt-40 flex flex-col justify-center px-6 py-12 w-100 h-150 bg-gray-100 rounded-xl">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 class="mt-2 text-center text-4xl tracking-wider font-semibold text-blue-800">Artfood</h1>
                    <h2 class="mt-3 text-center text-2xl tracking-tight font-light">Sign in to your account</h2>
                </div>

                <hr class="mt-5 mb-5 border-gray-400"/>

                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" class="space-y-6">
                        <div>
                            <label for="email" class="block text-sm/6 font-medium tracking-wide">Email address</label>
                            <div class="mt-2">
                            <input id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium tracking-wide">Password</label>
                            </div>
                            <div class="mt-2">
                            <input id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-gray-300 px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div class="flex flex-col justify-center items-center">
                            <button type="submit" class="w-full rounded-xl bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-800">Sign in</button>
                            <button type="submit" class="mt-4 w-full rounded-xl bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold hover:bg-gray-300">Create an account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AuthPage