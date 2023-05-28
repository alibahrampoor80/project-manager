
const { hashPassword} = require("../../modules/function");
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

    login() {
    }

    resetPassword() {
    }


}

module.exports = {
    AuthController: new AuthController()
}