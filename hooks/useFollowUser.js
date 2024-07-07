import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollowUser = (user) => {
    const userInfoString = localStorage.getItem("user-info");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    if (userInfo !== null) {
        const [isUpdating, setIsUpdating] = useState(false);
        const [followers, setFollowers] = useState(user.followers.length);
        const [isFollowing, setIsFollowing] = useState(user.followers.includes(userInfo.uid));

        const handleFollowUser = async () => {
            if (isUpdating) return;

            setIsUpdating(true);
            try {
                let userRef = doc(firestore, "users", user.uid);
                await updateDoc(userRef, {
                    followers: isFollowing ? arrayRemove(userInfo.uid) : arrayUnion(userInfo.uid),
                });

                userRef = doc(firestore, "users", userInfo.uid);
                await updateDoc(userRef, {
                    following: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
                });

                setIsFollowing(!isFollowing);
                isFollowing ? setFollowers(followers - 1) : setFollowers(followers + 1);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsUpdating(false);
            }
        }
        return {isUpdating, handleFollowUser, isFollowing, followers}
    }
}

export default useFollowUser