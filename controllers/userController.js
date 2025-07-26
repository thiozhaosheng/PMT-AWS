const userModel = require("../models/userModel");

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getUserById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error getting user by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function createUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await userModel.createUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Add this updateUser function to handle user editing
async function updateUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userData = req.body;
    const updatedUser = await userModel.updateUserById(id, userData);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await userModel.deleteUserById(id);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser, // export updateUser method
  deleteUser,
};
