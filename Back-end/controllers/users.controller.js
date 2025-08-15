import UsersModel from "../models/Users.model.js";
import bcrypt from "bcryptjs";

// Get all users
const getUsers = async (req, res) => {
  try {
    console.log("Request received: Finding Users");
    const users = await UsersModel.find();
    if (users.length > 0) {
      res.status(200).json({ message: "Users found", users });
    } else {
      res.status(404).json({ message: "No users found", users: [] });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing data!" });
    }

    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UsersModel({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Incomplete data!" });
    }

    const dbUser = await UsersModel.findOne({ email });
    if (!dbUser) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const isCorrectPassword = await bcrypt.compare(password, dbUser.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    return res.status(200).json({
      message: "User logged in successfully.",
      user: dbUser,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await UsersModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    return res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Optional: Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const existingUser = await UsersModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await existingUser.deleteOne();
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { getUsers, createUser, updateUser, loginUser, deleteUser };
