import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";



export const ProtectedRoute = ({children}) => {
    // get user 
    const {isAuthenticated} = useSelector(state => state.auth);

    // if the user is authenticated 
    if(isAuthenticated) {
        return children;
    }
    // if user is not authenticate, then move to home page
    else return (
        <Navigate to={"/"} replace />
    )
}
