const Category = require("../models/categoryModel");

// create category
exports.createCategory = async (req, res, next) => {
    const { name } = req.body;
    try {
        const category = await Category.create({
            name,
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            error,
        });
    }
};
// get all categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "All categories",
            categories,
        });
    } catch (error) {
        res.status(401).json({
            message: "Something went wrong",
            error,
        });
    }
};
