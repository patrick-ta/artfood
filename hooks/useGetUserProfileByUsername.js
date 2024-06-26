import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const getProfileData = async () => {
            setIsLoading(true);
            try {
                const usersRef = collection(firestore, "users");
                const q = query(usersRef, where("username", "==", username));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setProfileData(null);

                querySnapshot.forEach((doc) => {
					setProfileData(doc.data());
				});
            }
            catch(error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        getProfileData();
    }, [])

    return { isLoading, profileData };
}

export default useGetUserProfileByUsername