import { useEffect, useState } from "react"
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";

function Register() {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [register, {isError, error, data, isLoading, isSuccess }] = useRegisterMutation();

    console.log(data);

    // if error occurs or register successfull
    useEffect(() => {
        if(isError) {
            toast.error(error?.data?.message);
        }

        if(isSuccess) {
            toast.success('Register Succesfull');
        }
    }, [isError, error, isSuccess])


    // handle register form
    const handleSubmit = (e) => {
        // prevent default behaviour
        e.preventDefault();

        // prepare register data
        const registerData = {
            name : userName,
            email : userEmail,
            password : userPassword
        }
        
        // register user
        register(registerData);
    }




  return (
    <>
        <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-center ">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? 'Wait....' : 'REGISTER'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register