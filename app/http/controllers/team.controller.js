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

    async getTeamById(req, res, next) {
        try {
            const teamId = req.params.id
            const team = await teamModel.findById({_id: teamId})
            if (!team) throw {status: 400, message: "تیمی یافت نشد"}

            return res.status(200).json({
                status: 200,
                team
            })
        } catch (err) {
            next(err)
        }

    }

    async getMyTeams(req, res, next) {
        try {
            const userId = req.user._id
            const teams = await teamModel.find({
                $or: [
                    {owner: userId},
                    {users: userId}
                ]
            })
            return res.status(200).json({
                status: 200,
                teams
            })
        } catch (err) {
            next(err)
        }
    }

    async removeTeamById(req, res, next) {
        try {
            const teamId = req.params.id
            const team = await teamModel.find({_id: teamId})
            if (!team) throw {status: 404, message: "تیمی یافت نشد!"}
            const result = await teamModel.deleteOne({_id: teamId})
            if (result.deletedCount == 0) throw {status: 500, message: "حذف تیم انجام نشد"}
            return res.status(200).json({
                status: 200,
                message: "حذف تیم با موفیقت انجام شد!"
            })
        } catch (err) {
            next(err)
        }
    }

    async inviteUserToTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }

    }


    async updateTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    async removeUserFromTeam(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

}

module.exports = {TeamController: new TeamController()}