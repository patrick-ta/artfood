import { useState } from "react";
import { firestore, storage } from "../firebase/firebase"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function useCreatePost() {
    const [isLoading, setIsLoading] = useState(false);
    const uid = JSON.parse(localStorage.getItem("user-info")).uid;

    const handleCreatePost = async (selectedFile) => {
        if (isLoading) return;
        if (!selectedFile) throw new Error("Select an image");
        setIsLoading(true);

        const newPost = {
            caption: "caption",
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: uid,
        };

        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            const userDocRef = doc(firestore, "users", uid);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            await updateDoc(userDocRef, {posts: arrayUnion(postDocRef.id)});
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(postDocRef, {imageURL: downloadURL});
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    return {isLoading, handleCreatePost};
}

export default useCreatePost;