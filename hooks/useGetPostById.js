import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetPostById = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState({});

    useEffect(() => {
        const getPostData = async () => {
            setIsLoading(true);
            try {
                const postsRef = collection(firestore, "posts");
                console.log(id)

                const q = query(postsRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setPostData(null);

                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    setPostData(doc.data());
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

    return { isLoading, postData};
}

export default useGetPostById