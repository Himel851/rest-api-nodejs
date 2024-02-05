const { signup } = require('../../controllers/authController/signUp');

const signUpRoute = require("express").Router();

signUpRoute.post('/', signup);

module.exports = signUpRoute;