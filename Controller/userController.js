const e = require("express");
const User = require("../Model/User");
const mongoose = require("mongoose");

// Get All Users
const GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(400).json({ msg: "no users found" });
    }
    return res.status(200).json({ msg: "users found", users });
  } catch (err) {}
};
// Get user by id
const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const user = await User.find({ _id: id }, { password: 0, _id: 0 });
    if (!user) {
      return res.status(400).json({ msg: "no user found" });
    }
    return res.status(200).json({ msg: "user found", user });
  } catch (err) {
    console.log(err);
  }
};

// Add User
const AddUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "please enter all fields" });
    }
    const userExist = await User.find({ email: email });
    console.log("============", userExist);

    if (userExist.length > 0) {
      return res.status(400).json({ msg: "user already exist" });
    }
    const newuser = new User({ name, email, password });
    await newuser.save();
    return res
      .status(200)
      .json({ msg: "user added successfully", user: newuser });
  } catch (err) {
    console.log(err);
  }
};
// Update User
const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ msg: "please enter all fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, password },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ msg: "no user found" });
    }
    return res
      .status(200)
      .json({ msg: "user updated successfully", user: updatedUser });
  } catch (err) {
    console.log(err);
  }
};
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(400).json({ msg: "no user found" });
    }
    return res.status(200).json({ msg: "user deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { AddUser, GetAllUser, GetUserById, UpdateUser, DeleteUser };
