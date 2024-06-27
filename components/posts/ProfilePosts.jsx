import useGetUserPosts from "../../hooks/useGetUserPosts";
import PostFooter from "./PostFooter";

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
                        <PostFooter post={post}></PostFooter>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ProfilePosts