import { useEffect} from "react";
import { useSelector } from "react-redux";


const usePutDefaultUpdateUser = ({setUserName, setUserEmail}) => {
        const {user} = useSelector(state => state?.auth);

        // set default values in the form
        useEffect(() => {
            if(user) {
            setUserName(user?.name)
            setUserEmail(user?.email);
            }
        }, [user, setUserEmail, setUserName]);

}

export default usePutDefaultUpdateUser;