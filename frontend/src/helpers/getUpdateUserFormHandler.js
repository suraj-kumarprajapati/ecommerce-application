
// this function returns the update user form handler function
function getUpdateUserFormHandler({userName, userEmail, updateUser}) {
 

  // user update form submit handler function
  const handleSubmit = async (e) => {
    // prevent the default behaviour
    e.preventDefault();

    // prepare the user data for updation
    const userData = {
      name: userName,
      email: userEmail,
    };

    // call the update user profile api
    await updateUser(userData);
  };

  return handleSubmit;
}

export default getUpdateUserFormHandler;
