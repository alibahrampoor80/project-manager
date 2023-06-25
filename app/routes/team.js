const {checkLogin} = require("../http/middleware/autoLogin");
const {TeamController} = require("../http/controllers/team.controller");
const {createTeamValidator} = require("../http/validation/team");
const {ExpressValidatorMapper} = require("../http/middleware/checkErrors");
const {mongoIDValidator} = require("../http/validation/public");
const router = require('express').Router()

router.post('/create', checkLogin, createTeamValidator(), ExpressValidatorMapper, TeamController.createTeam)
router.get('/list', checkLogin, TeamController.getListOfTeam)
router.get('/me', checkLogin, TeamController.getMyTeams)
router.get('/:id', checkLogin, mongoIDValidator(), ExpressValidatorMapper, TeamController.getTeamById)
router.delete('/remove/:id', checkLogin, mongoIDValidator(), ExpressValidatorMapper, TeamController.removeTeamById)


module.exports = {teamRoutes: router}