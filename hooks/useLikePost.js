import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = (post) => {
    const userInfoString = localStorage.getItem("user-info");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    if (userInfo !== null) {
        const [isUpdating, setIsUpdating] = useState(false);
        const [likes, setLikes] = useState(post.likes.length);
        const [isLiked, setIsLiked] = useState(post.likes.includes(userInfo.uid));

        const handleLikePost = async () => {
            if (isUpdating) return;

            setIsUpdating(true);
            try {
                const postRef = doc(firestore, "posts", post.id);
                await updateDoc(postRef, {
                    likes: isLiked ? arrayRemove(userInfo.uid) : arrayUnion(userInfo.uid),
                });

                setIsLiked(!isLiked);
                isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsUpdating(false);
            }
        };

        return { isLiked, likes, handleLikePost, isUpdating };
    }
    else {
        const [isUpdating, setIsUpdating] = useState(false);
        const [likes, setLikes] = useState(post.likes.length);
        const [isLiked, setIsLiked] = useState(false);
        const handleLikePost = async () => {
            console.log("you must be signed in to like posts");
        }
        return { isLiked, likes, handleLikePost, isUpdating };
    }
    
}

export default useLikePost