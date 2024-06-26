import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);

    const signUp = async (inputs) => {
        if (!inputs.email || !inputs.username || !inputs.password) {
			console.log("missing fields");
			return;
		}

        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("email", "==", inputs.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
			console.log("email in use")
			return;
		}

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            console.log(newUser);
            if (!newUser && error) {
				console.log(error);
				return;
			}
            if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
			}
        }
        catch (error) {
            console.log(error);
        }
    };

    return {loading, error, signUp};
};

export default useSignUpWithEmailAndPassword;