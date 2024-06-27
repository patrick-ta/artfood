import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = (post) => {
    const uid = JSON.parse(localStorage.getItem("user-info")).uid;
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(uid));

    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!uid) return;

        setIsUpdating(true);
        try {
            const postRef = doc(firestore, "posts", post.id);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
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

export default useLikePost