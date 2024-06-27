import useGetUserPosts from "../hooks/useGetUserPosts";

const ProfilePosts = (uid) => {
    const { isLoadingPosts, posts } = useGetUserPosts(uid);
    console.log(isLoadingPosts)
    console.log(posts)

    return (
        <>
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <div>
                        <img src={post.imageURL} style={{ maxWidth: '30%' }} />
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ProfilePosts