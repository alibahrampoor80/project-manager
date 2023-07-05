const {userModel} = require("../../models/user");
const {createLinkForFiles} = require("../../modules/function");
const {teamModel} = require("../../models/team");

class UserController {
    async getProfile(req, res, next) {
        try {
            const user = req.user;
            user.profile_image = createLinkForFiles(user.profile_image, req)
            res.status(200).json({status: 200, user})
        } catch (err) {
            next(err)
        }
    }

    async editProfile(req, res, next) {
        try {
            const data = req.body
            const userId = req.user._id
            Object.entries(data).forEach(([key, value]) => {
                let field = ["first_name", "last_name", "skills"]
                let badValues = ["", " ", null, undefined, 0, -1, NaN, {}, []]
                if (!field.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]

            })
            // console.log(data)
            const result = await userModel.updateOne({_id: userId}, {$set: data})
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    message: "بروزرسانی پروفایل با موفقیت انجام شد"
                })
            }
            throw {status: 400, message: "بروز رسانی انجام نشد"}
        } catch (err) {
            next(err)
        }
    }

    async uploadProfileImage(req, res, next) {
        try {
            const userId = req.user._id
            // console.log(req.file)

            const filePath = req.file?.path?.substring(7)
            const result = await userModel.updateOne({_id: userId}, {
                $set: {
                    profile_image: filePath
                }
            })
            if (result.modifiedCount == 0) throw {status: 400, message: "بروزرسانی انجام نشد"}
            return res.status(200).json({status: 200, message: "بروز رسانی انجام شد"})
        } catch (err) {
            next(err)
        }
    }

    async getAllRequest(req, res, next) {
        try {
            const userId = req.user._id

            const {inviteRequests} = await userModel.findOne({_id: userId}, {inviteRequests: 1})
            return res.json({
                requests: inviteRequests || []
            })
        } catch (err) {
            next(err)
        }
    }

    async getRequestsByStatus(req, res, next) {
        try {
            const status = req.params.status
            const userId = req.user._id
            const requests = await userModel.aggregate([
                {
                    $match: {_id: userId}
                },
                {
                    $project: {
                        inviteRequests: 1,
                        _id: 0,
                        inviteRequests: {
                            $filter: {
                                input: "$inviteRequests",
                                as: 'request',
                                cond: {
                                    $eq: ["$$request.status", status]
                                }
                            }
                        }
                    }
                }
            ])

            return res.status(200).json({
                status: 200,
                requests: requests?.[0].inviteRequests || []
            })
        } catch (err) {
            next(err)
        }
    }

    async changeStatusRequest(req, res, next) {
        try {
            const {id, status} = req.params
            // console.log(status, id)
            const request = await userModel.findOne({"inviteRequests._id": id})
            if (!request) throw {status: 404, message: "درخواستی با این مشخصات یافت نشد!"}
            const findRequest = request.inviteRequests.find(item => item.id == id)
            if (findRequest.status != "pending") throw {status: 400, message: "این درخواست قبلا رد یا پذیرفته شده است"}
            if (!["accepted", "rejected"].includes(status)) throw {
                status: 400,
                message: "اطلاعات ارسال شده صحیح نمیباشد"
            }
            const updateResult = await userModel.updateOne({"inviteRequests._id": id},
                {
                    $set: {"inviteRequests.$.status": status}
                })
            if (updateResult.modifiedCount == 0) throw {status: 500, message: "تغییر وضعیت درخواست انجام نشد"}
            return res.status(200).json({
                status: 200,
                message: "تغییر وضعیت درخواست با موفیقت انجام شد"
            })
        } catch (err) {
            next(err)
        }

    }




    addSkills() {

    }

    editSkills() {

    }


    rejectInviteInTeam() {

    }

}

module.exports = {
    UserController: new UserController()
}