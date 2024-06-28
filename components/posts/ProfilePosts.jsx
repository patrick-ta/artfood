import useGetUserPosts from "../../hooks/useGetUserPosts";
import PostFooter from "./PostFooter";
import { useNavigate } from "react-router-dom";

const ProfilePosts = (uid) => {
    const { isLoadingPosts, posts } = useGetUserPosts(uid);
    const navigate = useNavigate();

    const navigateToPostPage = (id) => {
        console.log(id);
        navigate(`/post/${id}`);
    }  

    return (
        <>
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <div>
                        <img src={post.imageURL} style={{ maxWidth: '30%' }} onClick={() => navigateToPostPage(post.id)}/>
                        <PostFooter post={post}></PostFooter>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ProfilePosts