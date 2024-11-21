const express = require('express');
const {getProfilePicByEmail, verifyNormalUser,updateAmount,getAmount, CheckUser,getUserByEmail, updateUserProfile, Login, Logout, register, updateGProfile, updateProfile, sendOtp, getOtp, resendOtp} = require('../../controllers/LoginControllers/AuthController.js');
const { IsUser,IsGUser, checkUserByEmail, updatePassword} = require('../../middleware/LoginMiddleware/verifyToken.js');

const AuthRoutes = express.Router();


//-------------------LOGIN-CRUD------------------//


// POST endpoint to create a account
AuthRoutes.post('/register', register);

// POST endpoint to login into a account
AuthRoutes.post('/login', Login);

// POST endpoint to logout from a account
AuthRoutes.post('/logout', Logout);

// POST endpoint to check a account by EMAIL
AuthRoutes.post('/check-user', checkUserByEmail, (req, res) => {
    return res.status(200).json({ message: 'User found', user: req.user });
});

// POST endpoint to send OTP
AuthRoutes.post('/send-otp', sendOtp);

// POST endpoint to resend OTP
AuthRoutes.post('/resend-otp', resendOtp);

// GET endpoint to check a valid user
AuthRoutes.get('/checkUser', IsUser, CheckUser);

// GET endpoint to get a OTP by EMAIL
AuthRoutes.get('/get-otp/:email', getOtp);

// GET endpoint to get a user by EMAIL
AuthRoutes.get("/user/:email", getUserByEmail);

// GET endpoint to get a user profile picture by EMAIL
AuthRoutes.get('/profile-pic', getProfilePicByEmail);

// PATCH endpoint to update user profile (GOOGLE SIGN IN)
AuthRoutes.patch('/updateGProfile', IsGUser, updateGProfile);

// PATCH endpoint to update user profile (NORMAL SIGN IN)
AuthRoutes.patch('/updateProfile', IsUser, updateProfile);

//PATCH endpoint to update user password by email
AuthRoutes.patch('/update-password', checkUserByEmail, updatePassword);

//PATCH endpoint to update user profile by email
AuthRoutes.patch('/updateUserProfile/:email', updateUserProfile);

//PATCH endpoint to verify user by email
AuthRoutes.patch('/verify-user',    verifyNormalUser);


//-------------------MONEY-CRUD------------------//


// GET get user amount details
AuthRoutes.get('/get-amount', getAmount);

// PATCH update user amount
AuthRoutes.patch('/update-amount', updateAmount);




module.exports = AuthRoutes;
