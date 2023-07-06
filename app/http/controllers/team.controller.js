const {teamModel} = require("../../models/team");
const {userModel} = require("../../models/user");

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
            const teams = await teamModel.aggregate([
                {
                    $match: {
                        $or: [
                            {owner: userId},
                            {users: userId}
                        ]
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {
                    $project: {
                        "owner.roles": 0,
                        "owner.password": 0,
                        "owner.token": 0,
                        "owner.teams": 0,
                        "owner.inviteRequests": 0,
                        "owner.skills": 0,
                        "__v": 0,
                        "updatedAt": 0,
                        "createdAt": 0,
                    }
                },
                {
                    $unwind: "$owner"
                }
            ])
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
            const {username, teamId} = req.params
            const userId = req.user._id
            const team = await teamModel.findOne({
                $or: [{owner: userId}, {users: userId}],
                _id: teamId
            })
            if (!team) throw {status: 400, message: "تیمی جهت دعوت کردن افراد یافت نشد!"}
            const user = await userModel.findOne({username})
            if (!user) throw {status: 400, message: "کاربر مورد نظر جهت دعوت به تیم یافت نشد"}

            const userInvited = await teamModel.findOne({
                $or: [{owner: user._id}, {users: user._id}],
                _id: teamId
            })
            if (userInvited) throw {status: 400, message: "کاربر مورد نظر قبلا به تیم دعوت شده است!"}

            const request = {
                caller: req.user.username,
                requestDate: new Date(),
                teamId,
                status: "pending"
            }
            const updateUserResult = await userModel.updateOne({username}, {
                $push: {inviteRequests: request}
            })
            if (updateUserResult.modifiedCount == 0) throw {status: 500, message: "ثبت درخواست دعوت ثبت نشد!"}

            return res.status(200).json({
                status: 200,
                message: "ثبت درخواست با موفقیت ایجاد شد!"
            })

        } catch (err) {
            next(err)
        }

    }

    async updateTeam(req, res, next) {
        try {
            const data = {...req.body}
            Object.keys(data).forEach((key) => {
                if (!data[key]) delete data[key];
                if (["", " ", undefined, null, NaN].includes(data[key]))
                    delete data[key];
            });
            const userId = req.user._id
            const {teamId} = req.params
            const team = await teamModel.findOne({owner: userId, _id: teamId});
            if (!team) throw {status: 404, message: "تیمی با این مشخصات یافت نشد"};
            const teamEditResult = await teamModel.updateOne(
                {_id: teamId},
                {$set: data}
            );
            if (teamEditResult.modifiedCount == 0)
                throw {status: 500, message: "به روز رسانی مشخصات تیم انجام نشد"};
            return res.status(200).json({
                status: 200,
                message: "به روز رسانی با موفقیت انجام شد",
            });
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