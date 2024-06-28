import { useParams } from 'react-router-dom';
import useGetPostById from '../hooks/useGetPostById';

const PostPage = () => {
    const { postId } = useParams();
    const { isLoading, postData} = useGetPostById(postId);

    if (isLoading) {
        return (
            <></>
        )
    }

    return (
        <>
        <img src={postData.imageURL} alt="" />
        </>
    )
}

export default PostPage