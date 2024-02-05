const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(401).json({
            message: "Something went wrong!",
        });
    }
};

// update profile
exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        req.body.password = await bcrypt.hash(req.body.password, 11);
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        res.status(200).json({
            status: "success",
            message: "User updated",
            updatedUser,
        });
    } catch (err) {
        res.status(401).json({
            message: "you can update only your account!",
        });
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        const deleteUser = await User.findByIdAndDelete(userId);
        res.status(200).json({
            message: "User deleted successfully!",
            deleteUser,
        });
    } catch (err) {
        res.status(401).json({
            message: "you can delete only your account!",
        });
    }
};
