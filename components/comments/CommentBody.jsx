import { useState } from "react"
import useGetComments from "../../hooks/useGetComments";

const CommentBody = ({postData}) => {
    const {isLoading, commentData} = useGetComments(postData);

    if (isLoading || !commentData) {
        return (
            <></>
        )
    }

    return (
        <>
        <ul>
            {commentData.map(comment => (
                <li key={comment.createdAt}>
                    <div>
                        <h2>{comment.username}, {comment.createdBy}</h2>
                        <h2>{comment.comment}</h2>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default CommentBody