const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Password doesn't match!",
                });
            } else {
                const token = jwt.sign(
                    { email: user.email, id: user._id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "2h",
                    }
                );
                res.status(200).json({
                    message: "Login successful!",
                    token,
                });
            }
        }
    } catch (error) {
        res.status(401).json({
            message: "Not Found!",
        });
    }
}