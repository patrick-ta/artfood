import { useParams } from 'react-router-dom';
import useGetPostById from '../hooks/useGetPostById';

const PostPage = () => {
    const { postId } = useParams();
    const { isLoading, postData, userData} = useGetPostById(postId);

    if (isLoading) {
        return (
            <></>
        )
    }

    return (
        <>
        <h2>{userData.username}</h2>
        <h2>{postData.caption}</h2>
        <img src={postData.imageURL} alt="" />
        </>
    )
}

export default PostPage