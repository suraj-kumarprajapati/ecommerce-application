import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { useGetMyProfileQuery } from "../../redux/api/userApi";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setIsAuthenticated, setUser } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Header = () => {
  useGetMyProfileQuery(); // get the user profile
  const { user, isAuthenticated } = useSelector((state) => state.auth); // get user details
  // const navigate = useNavigate();     // for navigation
  const dispatch = useDispatch(); // to change the user details
  const [logout, { data, isError, error, isSuccess }] = useLazyLogoutQuery(); // logout function
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    // if any error occurs
    if (isError) {
      toast.error(error?.data?.message);
    }

    // if logged out successfully
    if (isSuccess) {
      toast.success(data?.message || "logged out");
      // set auth/user details to be null/false
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
    }

  }, [isError, error, isSuccess, data, dispatch]);

  // logout handler function
  const handleLogout = async () => {
    // logout
    await logout();
  };

  return (
    <nav className="navbar row ">
      {/* logo section  */}
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img
              src="/images/shopLogo2.webp"
              alt="ShopCart Logo"
              className="logoImage"
            />
          </a>
        </div>
      </div>

      {/* search section  */}
      {location.pathname == "/" && <Search />}
      {/* search section end  */}

      {/* cart info  */}
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3">
            {" "}
            Cart{" "}
          </span>
          <span className="ms-1" id="cart_count">
            0
          </span>
        </a>

        {/* user profile  */}
        {isAuthenticated ? (
          // if user exits
          <div className="dropdown  ms-2">
            <button
              className="btn dropdown-toggle text-white  d-flex align-items-center"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>

              <span>{user?.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              <Link className="dropdown-item" to="/admin/dashboard">
                {" "}
                Dashboard{" "}
              </Link>

              <Link className="dropdown-item" to="/me/orders">
                {" "}
                Orders{" "}
              </Link>

              <Link className="dropdown-item" to="/me/profile">
                {" "}
                Profile{" "}
              </Link>

              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={handleLogout}
              >
                {" "}
                Logout{" "}
              </Link>
            </div>
          </div>
        ) : (
          // if user doesn't exist
          <Link to="/login" className="btn ms-2" id="login_btn">
            {" "}
            Login{" "}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
