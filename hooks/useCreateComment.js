import { useState } from "react";
import { firestore, storage } from "../firebase/firebase"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

const useCreateComment = (postData) => {
    const [isLoading, setIsLoading] = useState(false);
    const uid = JSON.parse(localStorage.getItem("user-info")).uid;
    const username = JSON.parse(localStorage.getItem("user-info")).username;

    const handleCreateComment = async (comment) => {
        if (isLoading) return;
        if (!comment) throw new Error("Comment is blank");
        setIsLoading(true);

        const newComment = {
            comment: comment,
            createdBy: uid,
            username: username,
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