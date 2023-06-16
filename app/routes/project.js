const {ProjectController} = require("../http/controllers/project.controller");
const {createProjectValidator} = require("../http/validation/project");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const {checkLogin} = require("../http/middleware/autoLogin");
const {uploadFile} = require("../modules/express-fileupload");
const fileUpload = require("express-fileupload");
const {mongoIDValidator} = require("../http/validation/public");
const router = require('express').Router()

router.post('/create', fileUpload({ limits: {fileSize: 1024 * 1024 }, abortOnLimit: true}), checkLogin, createProjectValidator(), uploadFile, ExpressValidatorMapper, ProjectController.createProject)

router.get('/list', checkLogin, ProjectController.getAllProject)
router.get("/:id", checkLogin, mongoIDValidator(), ExpressValidatorMapper, ProjectController.getProjectById)
router.delete("/:id", checkLogin, mongoIDValidator(), ExpressValidatorMapper, ProjectController.removeProject)

module.exports = {projectRoutes: router}