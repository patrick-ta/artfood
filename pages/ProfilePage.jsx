import { useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import useGetUserProfileByUsername from '../hooks/useGetUserProfileByUsername';
import useGetUserPosts from '../hooks/useGetUserPosts';
import ProfilePosts from '../components/posts/ProfilePosts';
import FollowData from '../components/profile/FollowData';

const ProfilePage = () => {
    const { username } = useParams();
    const { isLoading, profileData} = useGetUserProfileByUsername(username);

    function formatDate(createdAt) {
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

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
        <FollowData profileData={profileData}></FollowData>
        <h2>joined: {formatDate(profileData.createdAt)}</h2>
        <ProfilePosts uid={profileData.uid}/>
        </>
    )
}

export default ProfilePage