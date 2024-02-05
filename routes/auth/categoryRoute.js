const { createCategory, getAllCategories } = require('../../controllers/categoryController');

const categoryRoute = require('express').Router();

categoryRoute.post("/", createCategory)
categoryRoute.get("/", getAllCategories)


module.exports = categoryRoute;