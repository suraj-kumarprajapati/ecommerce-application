import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForgotPasswordMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { user, isAuthenticated } = useSelector((state) => state?.auth);
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [ForgotPassword, { isSuccess, isError, error, data, isLoading }] =
    useForgotPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (isError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [isError, error, isSuccess, data, isAuthenticated, navigate]);

  // handle the forgot password form submit
  const ForgotPasswordHandler = (e) => {
    e.preventDefault();

    // prepare data
    const emailData = {
      email: userEmail,
    };

    // call the api
    ForgotPassword(emailData);
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={ForgotPasswordHandler}
          >
            <h2 className="mb-4">Forgot Password</h2>

            {/* email field start  */}
            <div className="mt-3">
              <label htmlFor="email_field" className="form-label">
                Enter Email
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
            {/* email field end  */}

            <button
              id="forgot_password_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Sending...." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
