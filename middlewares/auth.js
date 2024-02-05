const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
    try {
        // const token = req.header("Authorization");
        const token = req.headers.authorization;

        if (!token) {
        return res.status(401).json({
            message: "You are not authorized to access this route",
        });
        }
        const sToken = token.split(" ")[1];
        const decoded = jwt.verify(sToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
        return res.status(404).json({
            message: "No user found with this id",
        });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
        message: "Authenticate failed",
        });
    }
}