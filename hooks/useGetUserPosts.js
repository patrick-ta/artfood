import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = ({uid}) => {
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            setIsLoadingPosts(true);
            try {
                console.log(uid);
                const q = query(collection(firestore, "posts"), where("createdBy", "==", uid));
                const querySnapshot = await getDocs(q);
                const posts = [];
                querySnapshot.forEach((doc) => {
					posts.push({ ...doc.data(), id: doc.id });
				});
                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoadingPosts(false);
            }
        };
        getPosts();
    }, []);

    return {isLoadingPosts, posts};
}

export default useGetUserPosts