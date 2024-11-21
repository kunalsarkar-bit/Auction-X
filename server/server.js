require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DbCon = require("./utlis/LoginUtils/db.js");
const AuthRoutes = require("./routes/LoginRoutes/AuthRoutes.js");
const AdminLoginRoutes = require("./routes/LoginRoutes/AdminLoginRoutes.js");
const AdminRoutes = require("./routes/SellAnItemRoutes/adminRoutes.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/LoginSchema/user.js");
const Otp = require("./models/LoginSchema/otp.js");
const cloudinary = require("./utlis/SellAnItemUtils/cloudinaryConfig.js");
const productRoutes = require("./routes/SellAnItemRoutes/productRoutes.js");
const OrderRoutes = require("./routes/SellAnItemRoutes/orderRoutes.js");

const http = require("http");
const socketIo = require("socket.io");
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend URL
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type"], // Allow any required headers
    credentials: true, // Allow credentials if needed (cookies or headers)
  },
});

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// MongoDB connection
DbCon();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Routes setup
app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminLoginRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admins", AdminRoutes);
app.use("/api/orders", OrderRoutes);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        let user;
        let isNewUser = !existingUser;

        if (existingUser) {
          // Existing user: Update only the profile picture
          user = await User.findOneAndUpdate(
            { email: profile.emails[0].value },
            {
              profilePic: [
                {
                  secure_url: profile.photos[0].value,
                  public_id: "", // Add public_id if applicable; otherwise, keep it empty
                },
              ],
            },
            { new: true }
          );
        } else {
          // New user: Create the user and set isNewUser to true
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: [
              {
                secure_url: profile.photos[0].value, // Save the URL
                public_id: "", // Add public_id if applicable; otherwise, keep it empty
              },
            ],
            role: "user",
            password: "",
            isNewUser: true,
          });
          await user.save();
        }

        const token = jwt.sign(
          { email: user.email, name: user.name, role: user.role, isNewUser },
          process.env.JWT_SECRETE,
          { expiresIn: "30d" }
        );
        console.log("send token:", token);

        done(null, { token, user, isNewUser });
      } catch (error) {
        done(error);
      }
    }
  )
);

// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token, user, isNewUser } = req.user;

    const profilePic = JSON.stringify(user.profilePic);

    res.redirect(
      `http://localhost:3000/login?token=${token}&name=${user.name}&email=${
        user.email
      }&profilePic=${profilePic}&role=${
        user.role
      }&isNewUser=${isNewUser}&Gverified=${user.isVerified ? "true" : "false"}`
    );
  }
);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

let productData = {}; // Store product data for each product ID

io.on("connection", (socket) => {
  console.log("a user connected");

  // Send product data to new clients when they join
  socket.on("joinProductRoom", (productId) => {
    socket.join(productId); // Join a room based on the product ID
    if (productData[productId]) {
      socket.emit("productData", productData[productId]); // Emit data for this product
    } else {
      productData[productId] = { currentBid: 0, bidderName: "", productId }; // Initialize if not present
    }
  });

  // Listen for bid updates from clients
  socket.on("placeBid", (newBidData) => {
    const { productId, currentBid, bidderName } = newBidData;
    if (!productData[productId]) {
      productData[productId] = { currentBid: 0, bidderName: "", productId }; // Ensure product exists
    }

    // Update the specific product data
    productData[productId] = {
      ...productData[productId],
      currentBid,
      bidderName,
    };

    // Emit updated product data to all users in the specific room
    io.to(productId).emit("productData", productData[productId]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
