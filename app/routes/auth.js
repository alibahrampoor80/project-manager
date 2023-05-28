const {AuthController} = require("../http/controllers/auth.controller");
const {registerValidator, loginValidator} = require("../http/validation/auth");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const router = require('express').Router()

router.post('/register', registerValidator(), ExpressValidatorMapper, AuthController.register)
router.post('/login', loginValidator(), ExpressValidatorMapper, AuthController.login)

module.exports = {AuthRoutes: router}