const {login} = require('../../controllers/authController/login')
const loginRoute = require('express').Router();

loginRoute.post("/", login);
module.exports = loginRoute;

