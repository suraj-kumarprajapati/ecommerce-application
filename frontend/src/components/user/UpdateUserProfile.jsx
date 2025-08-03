import { useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import usePutDefaultUpdateUser from "../../hooks/usePutDefaultInUpdateUser.js";
import useHandleUpdateUserEffects from "../../hooks/useHandleUpdateUserEffects.js";
import getUpdateUserFormHandler from "../../helpers/getUpdateUserFormHandler.js";
import UserLayout from "../layouts/UserLayout";
import Metadata from "../layouts/Metadata.jsx";

const UpdateUserProfile = () => {
  // define states to take input from the user
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  // get updateUser api function to update user details
  const [updateUser, { isSuccess, error, isError, data }] = useUpdateUserMutation();

  // put default values in the update user form
  usePutDefaultUpdateUser({ setUserName, setUserEmail });

  // handle the side effects of handle form submit event handler
  useHandleUpdateUserEffects({ isSuccess, error, isError, data });

  // get the update user form handler
  const updateUserFormHandler = getUpdateUserFormHandler({
    userName,
    userEmail,
    updateUser,
  });

  return (
    <>
      <UserLayout>
        <Metadata title={"Update Profile"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form
              className="shadow rounded bg-body"
              encType="multipart/form-data"
              onSubmit={updateUserFormHandler}
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
      </UserLayout>
    </>
  );
};

export default UpdateUserProfile;
