import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const useLogout = () => {
    //isLoggingOut is the same as loading [signOut, loading, error]
    const [signOut, isLoggingOut, error] = useSignOut(auth);

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info");

        }
        catch (error) {
            console.log(error);
        }
    };
    return {handleLogout, isLoggingOut, error};
};

export default useLogout;