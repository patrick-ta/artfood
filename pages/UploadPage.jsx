import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg"
import useCreatePost from "../hooks/useCreatePost";
import { firestore, storage } from "../firebase/firebase"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const UploadPage = () => {
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const [caption, setCaption] = useState("");
    const imageRef = useRef(null);
    const {isLoading, handleCreatePost} = useCreatePost();

    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile);
            setSelectedFile(null);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange}/>
        <img src={selectedFile} style={{ maxWidth: '30%' }} />
        <button onClick={handlePostCreation}>Upload</button>
        </>
    )
}

export default UploadPage;

// function useCreatePost() {
//     const [isLoading, setIsLoading] = useState(false);
//     const uid = JSON.parse(localStorage.getItem("user-info")).uid;

//     const handleCreatePost = async (selectedFile) => {
//         if (isLoading) return;
//         if (!selectedFile) throw new Error("Select an image");
//         setIsLoading(true);

//         const newPost = {
//             caption: "caption",
//             likes: [],
//             comments: [],
//             createdAt: Date.now(),
//             createdBy: uid,
//         };

//         try {
//             const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
//             const userDocRef = doc(firestore, "users", uid);
//             const imageRef = ref(storage, `posts/${postDocRef.id}`);

//             await updateDoc(userDocRef, {posts: arrayUnion(postDocRef.id)});
//             await uploadString(imageRef, selectedFile, "data_url");
//             const downloadURL = await getDownloadURL(imageRef);

//             await updateDoc(postDocRef, {imageURL: downloadURL});
//         }
//         catch (error) {
//             console.log(error);
//         }
//         finally {
//             setIsLoading(false);
//         }
//     };

//     return {isLoading, handleCreatePost};
// }