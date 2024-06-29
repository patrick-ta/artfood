import { useState } from "react"
import useGetComments from "../../hooks/useGetComments";

const CommentBody = ({postData}) => {
    const {isLoading, commentData} = useGetComments(postData);

    if (isLoading) {
        return (
            <></>
        )
    }

    console.log(commentData[0][0].createdAt);

    return (
        <>
        <ul>
            {commentData.map(comment => (
                <li key={comment[0].createdAt}>
                    <div>
                        <h2>{comment[0].createdBy}</h2>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default CommentBody