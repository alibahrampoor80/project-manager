const {ProjectController} = require("../http/controllers/project.controller");
const {createProjectValidator} = require("../http/validation/project");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const {checkLogin} = require("../http/middleware/autoLogin");
const {uploadFile} = require("../modules/express-fileupload");
const fileUpload = require("express-fileupload");
const {mongoIDValidator} = require("../http/validation/public");
const router = require('express').Router()

router.post('/create', fileUpload(), checkLogin, createProjectValidator(), uploadFile, ExpressValidatorMapper, ProjectController.createProject)

router.get('/list', checkLogin, ProjectController.getAllProject)
router.get("/:id", checkLogin, mongoIDValidator(), ExpressValidatorMapper, ProjectController.getProjectById)
router.delete("/remove/:id", checkLogin, mongoIDValidator(), ExpressValidatorMapper, ProjectController.removeProject)
router.put("/edit/:id", checkLogin, mongoIDValidator(), ExpressValidatorMapper, ProjectController.updateProject)
router.patch("/edit-projectImage/:id", fileUpload(), checkLogin, uploadFile, mongoIDValidator(), ExpressValidatorMapper, ProjectController.updateProjectImage)

module.exports = {projectRoutes: router}