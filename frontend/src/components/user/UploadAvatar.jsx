
import UserLayout from "../layouts/UserLayout";

export const UploadAvatar = () => {
  return (
    <>
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body"
            action="#"
            method="post"
            encType="multipart/form-data"
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img src="" className="rounded-circle" alt="image" />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled=""
            >
              Upload
            </button>
          </form>
        </div>
      </div>
      </UserLayout>
    </>
  );
};
