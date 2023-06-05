const {ProjectController} = require("../http/controllers/project.controller");
const {createProjectValidator} = require("../http/validation/project");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const {checkLogin} = require("../http/middleware/autoLogin");
const router = require('express').Router()

router.post('/create',checkLogin, createProjectValidator(), ExpressValidatorMapper, ProjectController.createProject)

module.exports = {projectRoutes: router}