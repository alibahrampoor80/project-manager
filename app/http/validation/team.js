const {body} = require("express-validator");
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

module.exports = {createTeamValidator}