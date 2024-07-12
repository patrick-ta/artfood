import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            try {
                const usersRef = collection(firestore, "users");
                const querySnapshot = await getDocs(usersRef);

                if (querySnapshot.empty) return setProfileData(null);

                let usersArray = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (Object.keys(data).length > 0) {
                        usersArray.push({name: data.username, id: data.uid});
                    }
				});
                setUsers(usersArray);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        getUsers();
    }, []);

    return {isLoading, users};
}

export default useGetUsers