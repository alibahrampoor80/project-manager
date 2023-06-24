const {checkLogin} = require("../http/middleware/autoLogin");
const {TeamController} = require("../http/controllers/team.controller");
const {createTeamValidator} = require("../http/validation/team");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const router = require('express').Router()

router.post('/create', checkLogin, createTeamValidator(), ExpressValidatorMapper, TeamController.createTeam)
router.get('/list', checkLogin, TeamController.getListOfTeam)


module.exports = {teamRoutes: router}