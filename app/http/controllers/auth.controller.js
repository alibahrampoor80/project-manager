const {hashPassword, comparePassword, signToken} = require("../../modules/function");
const {userModel} = require("../../models/user");

class AuthController {
    async register(req, res, next) {
        const {username, email, password, mobile} = req.body
        try {
            const user = await userModel.create({
                username,
                email,
                password: hashPassword(password),
                mobile
            })
            res.json(user)
        } catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        console.log(req.headers.authorization)
        try {
            const {username, password} = req.body
            const user = await userModel.findOne({username})
            if (!user) throw {status: 401, message: "نام کاربری یا رمز عبور اشتباه میباشد"}

            if (!comparePassword(password, user.password)) throw {
                stauts: 401,
                message: "نام کاربری یا رمز عبور1 اشتباه میباشد"
            }
            const token = signToken({username})
            user.token = token
            await user.save()
            res.status(200).json({
                status: 200,
                success: true,
                message: "شما با موفقیت وارد حساب کاربری خود شدید",
                token
            })
        } catch (err) {
            next(err)
        }

    }

    resetPassword() {

    }


}

module.exports = {
    AuthController: new AuthController()
}