
import { useState, useEffect } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const UploadAvatar = () => {

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const {user} = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [uploadAvatar, { isError, error, isSuccess, isLoading}] = useUploadAvatarMutation();
  
  useEffect(() => {
    if(user?.avatar) {
      setAvatarPreview(user?.avatar?.url);
      setAvatar(user?.avatar?.url);
    }
    else {
      setAvatarPreview("/images/default_avatar.jpg");
      setAvatar("/images/default_avatar.jpg");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("avatar uploaded successfully");
      navigate("/me/profile");
    }

    // is any error occurs, toast the error message
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, navigate]);


  const submitAvatarHandler = (e) => {
    e.preventDefault();

    if(avatar == user?.avatar?.url) {
      toast.error("choose a different avatar");
      return;
    }

    const userAvatar = {
      avatar : avatar,
    }

    uploadAvatar(userAvatar);
  }

  const handleAvatarChange = (e) => {
    
    const reader = new FileReader();

    reader.onload = () => {
      // if file loaded successfully
      if(reader.readyState == 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    }

    reader.readAsDataURL(e.target.files[0]);


  }


  return (
    <>
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitAvatarHandler}
            encType="multipart/form-data"
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  {/* avatar preview  */}
                  <figure className="avatar item-rtl">
                    <img src={avatarPreview} className="rounded-circle" alt="image" />
                  </figure>
                  {/* avatar preview end  */}
                </div>
                
                {/* upload avatar  */}
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    onChange={handleAvatarChange}
                    accept="images/*"
                  />
                </div>
                {/* upload avatar end  */}
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload" }
            </button>
          </form>
        </div>
      </div>
      </UserLayout>
    </>
  );
};
