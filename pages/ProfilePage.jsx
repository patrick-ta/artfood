import { useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const ProfilePage = () => {
    const { username } = useParams();
    console.log(username);

    return (
        <>
        <h1>{username}</h1>
        </>
    )
}

export default ProfilePage