import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg"
import { firestore, storage } from "../firebase/firebase"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const UploadPage = () => {
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const imageRef = useRef(null);

    return (
        <>
        <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange}/>
        <img src={selectedFile} style={{ maxWidth: '30%' }} />
        </>
    )
}

export default UploadPage