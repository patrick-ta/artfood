import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetPostById = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const getPostData = async () => {
            setIsLoading(true);
            try {
                const postsRef = collection(firestore, "posts");
                const userRef = collection(firestore, "users");

                let q = query(postsRef, where("id", "==", id));
                let querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setPostData(null);
                
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    setPostData(doc.data());
                });

                q = query(userRef, where("posts", "array-contains", id))
                querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setUserData(null);

                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    setUserData(doc.data());
                });

            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        getPostData();
    }, []);

    return { isLoading, postData, userData};
}

export default useGetPostById