

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : [true, "Please enter your name"],
        maxLength : [50, "Your name can not exceed 50 characters"],
    },

    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : [true, "Your email must be unique"],
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,       // Regex for validating email
            'Please enter a valid email address', // Custom error message
        ],
    },

    password : {
        type : String, 
        required : [true, "Please enter password"],
        minLength : [6, "password must be of minimum 6 characters"],
        select : false,
    },

    avatar : {
        public_id : String,
        url : String,
    },

    role : {
        type : String,
        default : "user",
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date,

}, {timestamps : true});






// before saving the user information, encrypt the password
userSchema.pre("save", async function(next) {

    // if password is not modified or changed
    if(!this.isModified('password')) {
        next();
    }

    // pass the password and salt value to get the encrypted password
    this.password = await bcrypt.hash(this.password, 10);
});


// attach a method to user model to generate the token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME,
    });
}


// attach a method to user model to compare the password entered by user with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


// generate password reset token 
userSchema.methods.getResetPasswordToken = function() {
    // generate unique token for password reset
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash the generated password reset token
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // store the hashed reset token in user's resetPasswordToken property in database
    this.resetPasswordToken = hashedResetToken;

    // finally return the resetToken
    return resetToken;
}


// export the user model created based on user schema
const userModel = mongoose.model("User", userSchema);
export default userModel;

