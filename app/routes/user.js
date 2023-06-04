const {checkLogin} = require("../http/middleware/autoLogin");
const {UserController} = require("../http/controllers/user.controller");
const {uploadMulter} = require("../modules/multer");
const router = require('express').Router()

router.get('/profile', checkLogin, UserController.getProfile)
router.post('/edit', checkLogin, UserController.editProfile)
router.post('/profile-image', checkLogin,uploadMulter.single("image"), UserController.uploadProfileImage)

module.exports = {userRoutes: router}