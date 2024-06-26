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

    function formatDate(createdAt) {
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    console.log(isLoading);
    console.log(profileData);
    const userNotFound = !isLoading && !profileData;
    if (userNotFound) {
        return (
            <h1>user {username} not found</h1>
        )
    }

    if (isLoading) {
        return (
            <></>
        )
    }

    return (
        <>
        <h1>{username}</h1>
        <h2>{profileData.bio}</h2>
        <h2>followers: {profileData.followers.length}</h2>
        <h2>following: {profileData.following.length}</h2>
        <h2>joined: {formatDate(profileData.createdAt)}</h2>
        </>
    )
}

export default ProfilePage