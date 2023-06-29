const {userModel} = require("../../models/user");
const {createLinkForFiles} = require("../../modules/function");

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

    async getPendingRequests(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    async getAcceptedRequests(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    async getRejectedRequests(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    addSkills() {

    }

    editSkills() {

    }

    acceptInviteTeam() {

    }

    rejectInviteInTeam() {

    }

}

module.exports = {
    UserController: new UserController()
}