const {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    getSinglePost,
} = require("../../controllers/postController");
const { authMiddleware } = require("../../middlewares/auth");

const postRoute = require("express").Router();

postRoute.post("/", authMiddleware, createPost);
postRoute.get("/", getAllPost);
postRoute.get("/:postId", getSinglePost);
postRoute.put("/:postId", authMiddleware, updatePost);
postRoute.delete('/:postId', authMiddleware, deletePost)

module.exports = postRoute;
