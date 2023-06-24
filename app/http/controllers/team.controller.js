const {teamModel} = require("../../models/team");

class TeamController {
    async createTeam(req, res, next) {
        try {
            const {name, description, username} = req.body
            const owner = req.user._id
            const team = await teamModel.create({name, description, username, owner})

            if (!team) throw {status: 500, message: "ایجاد تیم با خطا مواجه شد"}
            return res.status(201).json({
                status: 201,
                message: "ایجاد تیم با موفقیت انجام شد!"
            })

        } catch (err) {
            next(err)
        }
    }

    async getListOfTeam(req, res, next) {
        try {
            const owner = req.user._id
            const team = await teamModel.find({})
            return res.status(200).json({
                status: 200,
                team
            })
        } catch (err) {
            next(err)
        }
    }

    async inviteUserToTeam() {

    }

    async removeTeamById() {
    }

    async updateTeam() {
    }

    async removeUserFromTeam() {
    }

}

module.exports = {TeamController: new TeamController()}