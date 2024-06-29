import { useState } from "react";
import { firestore, storage } from "../firebase/firebase"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

const useCreateComment = (postData) => {
    const [isLoading, setIsLoading] = useState(false);
    const userInfoString = localStorage.getItem("user-info");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;


    const handleCreateComment = async (comment) => {
        if (isLoading) return;
        if (userInfo === null) {
            console.log("you must be logged in to leave comments");
            return;
        }
        if (!comment) throw new Error("Comment is blank");
        setIsLoading(true);

        const newComment = {
            comment: comment,
            createdBy: userInfo.uid,
            username: userInfo.username,
            postId: postData.id,
            createdAt: Date.now(),
        };

        try {
            const postsRef = doc(firestore, "posts", postData.id);
            await updateDoc(postsRef, {comments: arrayUnion(newComment)});
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }

    };

    return {isLoading, handleCreateComment};
}

export default useCreateComment