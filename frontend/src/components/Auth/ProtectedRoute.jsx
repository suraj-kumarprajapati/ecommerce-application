import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";



export const ProtectedRoute = ({admin, children}) => {
    // get user 
    const {user, isAuthenticated, isUserLoading} = useSelector(state => state.auth);

    // if user is still loading, then redirect to loader
    if(isUserLoading) {
        return <Loader />
    }

    // if admin is true, then check if user is admin
    if(admin && user?.role !== "admin") {
        return <Navigate to={"/"} replace />;
    }


    // if the user is authenticated 
    if(isAuthenticated) {
        return children;
    }
    // if user is not authenticate, then move to home page
    else return (
        <Navigate to={"/login"} replace />
    )
}
