const UserModel = require("../../models/LoginSchema/user");

const Getuser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const deletUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await UserModel.findById(userId);

    if (checkAdmin.role == "admin") {
      return res.status(409).json({ message: "You cannot delete yourself" });
    }

    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

module.exports = {
  Getuser,
  deletUser,
};
