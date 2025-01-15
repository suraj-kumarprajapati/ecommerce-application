import { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserLayout from '../layouts/UserLayout'

export const UpdatePassword = () => {


    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updatePassword, {isSuccess, isError, error, isLoading}] = useUpdatePasswordMutation();
    const navigate = useNavigate();


    useEffect(() => {
        if (isSuccess) {
          toast.success("password updated successfully");
          navigate("/me/profile");
        }
    
        // is any error occurs, toast the error message
        if (isError) {
          toast.error(error?.data?.message);
        }
      }, [isSuccess, isError, error, navigate]);


    const toggleVisibility = (e) => {
        const passwordField = document.getElementById(e.target.name);

        if(passwordField) {
            if(passwordField.type === 'password') {
                passwordField.type = 'text';
            }
            else if(passwordField.type === 'text') {
                passwordField.type = 'password';
            }
        }
    }


    // handle the form submit
    const updatePasswordHandler = (e) => {
        e.preventDefault();

        const passwordData = {
            oldPassword : oldPassword,
            newPassword : newPassword,
        }

        updatePassword(passwordData);
    }

  return (
    
    <>
    <UserLayout >
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={updatePasswordHandler}>
            <h2 className="mb-4 text-center">Update Password</h2>

            {/* old password section start */}
            <div className="mb-3">
              <label htmlFor="old_password_field" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            {/* old password section end  */}

            <div className="mb-3 flex justify-end" >
                <input type="checkbox"  onClick={toggleVisibility} id="toggle_old_psw" name="old_password_field" />
                <label htmlFor="toggle_old_psw" >Show Old Password</label>
            </div>

            

            {/* new password section start  */}
            <div className="mb-3">
              <label htmlFor="new_password_field" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {/* new password section end  */}

            
            <div className="mb-3 flex justify-end">
                <input  type="checkbox"  onClick={toggleVisibility} id="toggle_new_psw" name="new_password_field" />
                <label htmlFor="toggle_new_psw" >Show New Password</label>
            </div>

            <button type="submit" className="btn update-btn w-100" disabled={isLoading} >
              { isLoading ? "Updating..." : "Update Password" }
            </button>
          </form>
        </div>
      </div>
      </UserLayout>
    </>
  );
};
