const {ProjectController} = require("../http/controllers/project.controller");
const {createProjectValidator} = require("../http/validation/project");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const {checkLogin} = require("../http/middleware/autoLogin");
const {uploadFile} = require("../modules/express-fileupload");
const router = require('express').Router()

router.post('/create', checkLogin, createProjectValidator(), uploadFile, ExpressValidatorMapper, ProjectController.createProject)

module.exports = {projectRoutes: router}