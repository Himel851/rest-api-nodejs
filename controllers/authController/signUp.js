const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11);
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: `Hello ${name}, welcome to our application!`,
            user,
        });
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong!",
        });
    }
};
