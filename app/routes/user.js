const {checkLogin} = require("../http/middleware/autoLogin");
const {UserController} = require("../http/controllers/user.controller");
const router = require('express').Router()

router.get('/profile', checkLogin, UserController.getProfile)

module.exports = {userRoutes: router}