import { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated } = useSelector(state => state.auth);
  const [resetPassword, {isError, error, isSuccess, data, isLoading}] = useResetPasswordMutation();
  const navigate = useNavigate();
  const params = useParams();


  // handle the sideeffects
  useEffect(() => {
    if(isAuthenticated) {
      navigate("/");
    }

    if(isSuccess) {
      console.log(data);
      toast.success("Password updated successfully");
      navigate("/login");
    }

    if(isError) {
      toast.error(error?.data?.message);
    }

  }, [isError, error, isSuccess, data, navigate, isAuthenticated ]);

  
  // handle the reset password form
  const resetPasswordHandler = (e) => {
    e.preventDefault();

    if(!password || !confirmPassword) {
      toast.error("Field can not be empty");
      return;
    }

    if(password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    // prepare body
    const passwordBody = {
      password,
      confirmPassword,
    };

    // call the api
    resetPassword({ 
      token : params?.token, 
      body : passwordBody 
    });
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={resetPasswordHandler}
          >
            <h2 className="mb-4">New Password</h2>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm_password_field" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              { isLoading ? "Wait..." : "Set Password" }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
