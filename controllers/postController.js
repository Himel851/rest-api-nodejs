const Post = require("../models/postModel");

// create post 
exports.createPost = async (req, res, next) => {
    const { title, description, username, category, photo } = req.body;
    try {
        const post = await Post.create({
            title,
            description,
            username,
            category,
            photo,
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            error,
        }) 
    }
};

//getAllPost
exports.getAllPost = async (req, res, next) => {
    const {username, category} = req.query;
    try {
        let posts;
        if(username){
            posts = await Post.find({username});
        }
        else if(category){
            posts = await Post.find({
                category: {
                    $in: [category],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            error,
        }) 
    }
};

// post update 
exports.updatePost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(401).json({
                message: "Post not found",
            });
        }
        const updatePost = await Post.findByIdAndUpdate(postId,req.body, { new: true });
        res.status(200).json({
            message: "Post updated successfully",
            updatePost,
        });
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            error,
        }) 
    }
};

//post delete
exports.deletePost = async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: "Post not found",
            });
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            error,
        }) 
    }
};

//get single post
exports.getSinglePost = async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({
                message: "Post not found",
            });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong",
            error,
        }) 
    }
}