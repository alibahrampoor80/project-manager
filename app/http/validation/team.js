const {body, param} = require("express-validator");
const {teamModel} = require("../../models/team");

function createTeamValidator() {
    return [
        body("name").isLength({min: 5}).withMessage('شما باید بیشتر از 5 کارکتر وارد کنید'),
        body("description").notEmpty().withMessage("توضیحات تیم نمیتواند خالی باشد"),
        body("username").custom(async (username) => {
            const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if (usernameRegex.test(username)) {
                const team = await teamModel.findOne({username})
                if (team) throw "نام کاربری قبلا توسط تیم دیگری استفاده شده است"
                return true
            }
            throw "نام کاربری را به طور صحیح وارد کنید"

        })
    ]
}

// function inviteToTeam() {
//     return [
//         param('teamId').custom(async (teamId, {req}) => {
//             const userId = req.user._id
//             const team = await teamModel.findOne({
//                 $or: [{owner: userId}, {users: userId}],
//                 _id: teamId
//             })
//             if (!team) throw "تیمی جهت دعوت کردن افراد یافت نشد!"
//         }),
//         param("username").custom()
//     ]
// }

module.exports = {createTeamValidator}