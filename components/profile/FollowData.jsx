import useFollowUser from "../../hooks/useFollowUser"

const FollowData = ({profileData}) => {
    const { isUpdating, handleFollowUser, isFollowing, followers } = useFollowUser(profileData);

    return (
        <>
        <h2>followers: {followers}</h2>
        {isFollowing ? <button onClick={handleFollowUser}>Unfollow</button> : <button onClick={handleFollowUser}>Follow</button>}
        <h2>following: {profileData.following.length}</h2>
        </>
    )
}

export default FollowData