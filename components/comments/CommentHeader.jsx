import { useState } from "react";
import useCreateComment from "../../hooks/useCreateComment"

const CommentHeader = ({postData, userData}) => {
    const [comment, setComment] = useState("");
    const {isLoading, handleCreateComment} = useCreateComment(postData, userData);

    console.log(comment)

    return (
        <>
        
        <input type="text" placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} style={{ width: '30%' }}/>
        <button onClick={() => handleCreateComment(comment)}>Comment</button>

        </>
    )
}

export default CommentHeader