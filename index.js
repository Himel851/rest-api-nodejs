const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const dotenv = require("dotenv");
const morgan = require("morgan");
const multer = require("multer");
const signUpRoute = require("./routes/auth/signUpRoute");
const loginRoute = require("./routes/auth/loginRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/auth/postRoutes");
const categoryRoute = require("./routes/auth/categoryRoute");
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

// file upload by multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
// upload router 
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

// routes
app.use("/api/signup", signUpRoute);
app.use("/api/login", loginRoute);
app.use("/api/users", userRoute);

// post routes 
app.use("/api/posts", postRoute);

//category routes
app.use("/api/category", categoryRoute)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
