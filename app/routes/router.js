const {projectRoutes} = require("./project");
const {teamRoutes} = require("./team");
const {userRoutes} = require("./user");
const {AuthRoutes} = require("./auth");

const router = require('express').Router()

router.use('/auth', AuthRoutes)
router.use('/project', projectRoutes)
router.use('/team', teamRoutes)
router.use('/user', userRoutes)

module.exports = {allRoutes: router}