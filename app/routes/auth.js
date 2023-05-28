const {AuthController} = require("../http/controllers/auth.controller");
const {registerValidator} = require("../http/validation/auth");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const router = require('express').Router()

router.post('/register',registerValidator(),ExpressValidatorMapper, AuthController.register)

module.exports = {AuthRoutes: router}