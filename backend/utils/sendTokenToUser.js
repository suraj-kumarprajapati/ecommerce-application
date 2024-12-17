

// this function will send jwt token to user after register or login
const sendTokenToUser = (user, statusCode, res) => {
    // get token for the current user
    const token = user.getJwtToken();

    // get Cookie expires time, default 7 days
    const COOKIE_EXPIRES_TIME = process.env.COOKIE_EXPIRES_TIME || 7;

    // prepare options to cookie
    const options = {
        // date in milliseconds
        expires : new Date( Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly : true, 
    }

    // send the cookie with response
    res.status(statusCode).cookie("token", token, options).json({
        success : true,
        token
    });
}


export default sendTokenToUser;