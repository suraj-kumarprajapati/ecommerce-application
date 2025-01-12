import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {  setUser } from "../../redux/features/userSlice";

const UpdateUserProfile = () => {

    const {user} = useSelector(state => state?.auth);
    const [userName, setUserName] = useState(user?.name || '');
    const [userEmail, setUserEmail] = useState(user?.email || '');
    const [updateUser, { isSuccess, error, isError, data}] = useUpdateUserMutation();
    const dispatch = useDispatch();


    // handle the side effects of form handle function
    useEffect( () => {
        if(isSuccess) {
            toast.success('user profile updated successfully');
            dispatch(setUser(data?.updatedUser));
        }

        if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, isError, error, data, dispatch]);
    


    // form submit handler function
    const handleSubmit = async (e) => {
        // prevent the default behaviour
        e.preventDefault();

        // prepare the user data for updation
        const userData = {
            name : userName,
            email :userEmail,
        }

        // call the update user profile api
        await updateUser(userData);
    }
  
  
    return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4">Update Profile</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn update-btn w-100">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};



export default UpdateUserProfile;
