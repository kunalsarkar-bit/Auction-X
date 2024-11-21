const jwt = require("jsonwebtoken");
const UserModel = require("../../models/LoginSchema/user");
const bcrypt = require("bcrypt"); // Add this line

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ messsage: "'Unauthorized: No token provided'" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ messsage: "'user not found'" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ messsage: "Unauthorized: User is not an admin" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const IsUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    console.log("Token being verified:", token); // Log the token for debugging

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRETE); // Ensure the variable name is correct

    // Fetch the user from the database using the user ID from the token
    const user = await UserModel.findById(decoded.id); // Use 'id' if that's the field in your token payload
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Changed status to 404
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const IsGUser = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Received token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const tokenWithoutBearer = token.split(" ")[1]; // Remove "Bearer"

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRETE, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded; // Attach decoded user info to the request
    next();
  });
};

const checkUserByEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request object for the next middleware
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Middleware to update user password
const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const user = req.user; // Retrieved from the previous middleware

  // Log the request body to check what's being sent
  console.log("Request body:", req.body);
  console.log("New password:", newPassword);

  try {
    // Check if newPassword is valid
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  isAdmin,
  IsUser,
  IsGUser,
  checkUserByEmail,
  updatePassword,
};
