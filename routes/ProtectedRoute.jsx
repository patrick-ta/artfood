import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children, user}) => {
    if (user) {
        return children;
    }
    else {
        console.log(user);
        return <Navigate to="/"/>;
    }
}

export default ProtectedRoute