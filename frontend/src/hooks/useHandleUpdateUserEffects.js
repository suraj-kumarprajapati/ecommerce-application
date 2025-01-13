import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

// this hook handles the side effects of update user form submit handler
const useHandleUpdateUserEffects = ({ isSuccess, isError, error, data }) => {
  // get navigate function
  const navigate = useNavigate();
  // get dispatch function
  const dispatch = useDispatch();

  // handle the side effects of update user form
  useEffect(() => {
    // if successfully updated the profile, toast the success message
    if (isSuccess) {
      // toast success message
      toast.success("user profile updated successfully");
      // set updated user details in the user state
      dispatch(setUser(data?.updatedUser));
      // after updating the user details, go to user profile page
      navigate("/me/profile");
    }

    // is any error occurs, toast the error message
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, data, dispatch, navigate]);
};

export default useHandleUpdateUserEffects;
