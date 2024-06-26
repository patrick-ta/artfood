import { useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import useGetUserProfileByUsername from '../hooks/useGetUserProfileByUsername';

const ProfilePage = () => {
    const { username } = useParams();
    const { isLoading, profileData} = useGetUserProfileByUsername(username);
    //const [profileData, setProfileData] = useState({});
    //console.log(username);
    
    // useEffect(() => {
    //     const getProfileData = async () => {
    //         const usersRef = collection(firestore, "users");
    //         const q = query(usersRef, where("username", "==", username));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             setProfileData(doc.data());
    //         });
    //     }

    //     getProfileData();
    // }, []);

    // console.log(profileData);

    console.log(isLoading);
    console.log(profileData);
    const userNotFound = !isLoading && !profileData;
    if (userNotFound) {
        return (
            <h1>user {username} not found</h1>
        )
    }

    return (
        <>
        <h1>{username}</h1>
        </>
    )
}

export default ProfilePage