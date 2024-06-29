import { useParams } from 'react-router-dom';
import useGetPostById from '../hooks/useGetPostById';
import useCreateComment from '../hooks/useCreateComment';
import CommentHeader from '../components/comments/CommentHeader';
import CommentBody from '../components/comments/CommentBody';

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
        <img src={postData.imageURL} alt="" style={{ width: '30%' }}/>

        <h2>Comments</h2>

        <CommentHeader postData={postData}></CommentHeader>
        <CommentBody postData={postData}></CommentBody>
        
        </>
    )
}

export default PostPage