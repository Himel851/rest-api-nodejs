const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("MongoDB connection SUCCESS");
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (error) {
        console.error("MongoDB connection FAIL");
    }
};

module.exports = connectDB;
