const UserModel = require("../../models/LoginSchema/user.js");
const Otp = require("../../models/LoginSchema/otp.js"); // Updated OTP model
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const sendOtpEmail = require("../../utlis/LoginUtils/emailSender.js"); // Assuming you have a utility for sending emails
const cloudinary = require("../../utlis/LoginUtils/cloudinaryConfiglogin.js");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address = "",
      phoneNo = "",
      gender = "",
    } = req.body;

    console.log("Request body:", req.body); // Log the incoming request

    // Check if user already exists
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" }); // Use 409
    }

    console.log("User does not exist, proceeding to register.");

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Password hashed:", hashedPassword);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNo,
      gender,
    });

    // Save the new user
    await newUser.save();
    console.log("User registered successfully:", newUser);

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRETE,
      { expiresIn: "1h" }
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000, // 1 hour
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token, // Include the token in the response
      newUser: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }, // Return only necessary user data
    });
  } catch (error) {
    console.error("Registration error:", error); // Log the entire error object for more detail
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      console.error("Email and password are required");
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.error("User not found for email:", email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password for user:", email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRETE,
      { expiresIn: "1h" }
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000, // 1 hour
    });

    // Send a successful response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
        verified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error); // Log the error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const CheckUser = async (req, res) => {
  try {
    const user = req.user; // Access the authenticated user
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Added return here
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Check User Error:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, address, phoneNo, gender, profilePic } = req.body;
    const userId = req.user._id; // Get the user from the request object

    // Update user information
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        address,
        phoneNo,
        gender,
        profilePic: profilePic || [], // Ensure profilePic is an array
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateGProfile = async (req, res) => {
  try {
    const { address, phoneNo, gender } = req.body;
    const userEmail = req.user.email; // Get the user email from the authenticated user

    // Update the user's address, phoneNo, and gender based on email
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userEmail }, // Find user by email
      { address, phoneNo, gender },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999

    // Create and save OTP entry in the database
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Send OTP email
    await sendOtpEmail(email, otp); // Assuming sendOtpEmail is your email sending logic

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};

// Controller to get the OTP
const getOtp = async (req, res) => {
  const { email } = req.params;

  try {
    const otpEntry = await Otp.findOne({ email });

    if (!otpEntry) {
      return res.status(404).json({ message: "OTP not found" });
    }

    res.status(200).json({ otp: otpEntry.otp });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving OTP", error: error.message });
  }
};
const resendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    await Otp.findOneAndUpdate(
      { email },
      { otp: newOtp },
      { new: true, upsert: true }
    );
    await sendOtpEmail(email, newOtp);
    res.status(200).json({ message: "OTP resent successfully", otp: newOtp });
  } catch (error) {
    console.error("Error in resendOtp:", error.message);
    res.status(500).json({ message: "Failed to resend OTP. Please try again." });
  }
};


// Controller to get user by email
const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    // Exclude the password field from the user object
    const user = await UserModel.findOne({ email: email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const email = req.params.email;
  const updatedData = req.body;

  console.log("Updated Data:", updatedData); // Log the incoming data for debugging

  try {
    // Find user by email and update only the specified fields
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          name: updatedData.name,
          address: updatedData.address,
          phoneNo: updatedData.phoneNo,
          gender: updatedData.gender,
        },
      },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAmount = async (req, res) => {
  const { email, amount } = req.body;
  console.log(email, amount);

  if (!email || !amount) {
    return res.status(400).json({ error: "Email and amount are required." });
  }

  try {
    // Find user by email and update the amount
    const updatedPayment = await UserModel.findOneAndUpdate(
      { email }, // Find by email
      { amount }, // Update the amount
      { new: true } // Return the updated document
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with success
    res
      .status(200)
      .json({ message: "Amount updated successfully!", data: updatedPayment });
  } catch (error) {
    console.error("Error updating amount in the database:", error);
    res.status(500).json({ error: "Failed to update amount." });
  }
};

const getAmount = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the user's amount
    res.status(200).json({ amount: user.amount, name: user.name });
  } catch (error) {
    console.error("Error fetching amount:", error);
    res.status(500).json({ error: "Failed to fetch amount." });
  }
};

const getProfilePicByEmail = async (req, res) => {
  try {
    // Retrieve email from request query parameters
    const { email } = req.query;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    // If user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the profilePic array (assuming it has at least one picture)
    const profilePic = user.profilePic[0]?.secure_url;
    const name = user.name;

    // Send profile picture URL as a response if it exists, else a message
    if (profilePic) {
      res.status(200).json({ profilePic, name });
    } else {
      res.status(404).json({ message: "Profile picture not found" });
    }
  } catch (error) {
    // Send a 500 response if there's a server error
    res.status(500).json({ message: "Server error", error });
  }
};

const verifyNormalUser = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the user by email and update 'isvarified' to true
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      { isVerified: true },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  register,
  Login,
  Logout,
  CheckUser,
  updateProfile,
  updateGProfile,
  sendOtp,
  getOtp,
  resendOtp,
  getUserByEmail,
  updateUserProfile,
  updateAmount,
  getAmount,
  getProfilePicByEmail,
  verifyNormalUser,
};
