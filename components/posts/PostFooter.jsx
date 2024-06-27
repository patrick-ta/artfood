import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({post}) => {
    const { handleLikePost, isLiked, likes } = useLikePost(post);

    return (
        <>
        <div>
            {post.id}
        </div>
        {isLiked ? <button onClick={handleLikePost}>Unlike</button> : <button onClick={handleLikePost}>Like</button>}
        {likes}
        
        </>
    )
}

export default PostFooter