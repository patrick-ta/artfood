import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const useGetComments = (postData) => {
    const [isLoading, setIsLoading] = useState(true);
    const [commentData, setCommentData] = useState([]);

    console.log(postData);

    useEffect(() => {
        let unsubscribe = () => {};

        const getCommentData = async () => {
            setIsLoading(true);
            try {
                const postsRef = collection(firestore, "posts");
                const q = query(postsRef, where("id", "==", postData.id));

                unsubscribe = onSnapshot(q, (snapshot) => {
                    let comments = [];
                    snapshot.forEach((doc) => {
                        comments = doc.data().comments;
                    });

                    if (comments.length === 0) return setCommentData(null);

                    comments.sort((a, b) => b.createdAt - a.createdAt);

                    setCommentData(comments);
                });
                
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        getCommentData();

        return () => unsubscribe();
    }, [postData]);

    return {isLoading, commentData};
}

export default useGetComments


/*
OLD CODE
here just in case i wanna redo real-time functionality

import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetComments = (postData) => {
    const [isLoading, setIsLoading] = useState(true);
    const [commentData, setCommentData] = useState([]);

    console.log(postData);

    useEffect(() => {
        const getCommentData = async () => {
            setIsLoading(true);
            try {
                const postsRef = collection(firestore, "posts");
                let q = query(postsRef, where("id", "==", postData.id));
                let querySnapshot = await getDocs(q);

                

                let comments = [];
                querySnapshot.forEach((doc) => {
                    comments = doc.data().comments;
                });

                if (comments.length === 0) return setCommentData(null);

                comments.sort((a, b) => b.createdAt - a.createdAt);

                setCommentData(comments);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        getCommentData();
    }, []);

    return {isLoading, commentData};
}

export default useGetComments

*/