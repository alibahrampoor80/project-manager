const {body} = require('express-validator')
const {userModel} = require("../../models/user");

function registerValidator() {
    return [
        body('username').custom(async (value, ctx) => {
            if (value) {
                const UsernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if (UsernameRegex.test(value)) {
                    const user = await userModel.findOne({username:value})
                    if (user) throw 'نام کاربری تکراری میباشد'
                    return true
                }
                throw 'نام کاربری صحیح نمیباشد'
            }
            throw 'نام کاربری نمیتواد خالی باشد'
        }),
        body('email').isEmail().withMessage('ایمیل وارد شده صحیح نمیباشد')
            .custom(async (email) => {
                const user = await userModel.findOne({email})
                if (user) throw 'ایمیل تکراری میباشد'
                return true
            })
        ,
        body('mobile').isMobilePhone('fa-IR').withMessage('شماره موبایل وارد شده صحیح نمیباشد')
            .custom(async (mobile) => {
                const user = await userModel.findOne({mobile})
                if (user) throw 'موبایل تکراری میباشد'
                return true
            })
        ,
        body('password').isLength({
            min: 6,
            max: 16
        }).withMessage('رمز عبور باید 6 و حداکثر 16 نویسه باشد.').custom((value, ctx) => {
            if (!value) throw 'رمز عبور نمیتواد خالی باشد'
            if (value !== ctx?.req?.body?.confirmPassword) throw 'رمز عبور با تکرار برابر نیست'
            return true
        })
    ]
}

module.exports = {
    registerValidator
}