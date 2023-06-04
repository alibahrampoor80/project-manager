const {verifyToken} = require("../../modules/function");

const {userModel} = require('../../models/user')

async function checkLogin(req, res, next) {
    try {
        const authorization = req?.headers?.authorization

        if (!authorization) throw {status: 401, message: "لطفا وارد حساب کاربری خود شوید"}
        // let token = authorization.split(" ")?.[1]
        let [bearer, token] = authorization.split(' ')
        if (bearer && bearer.toLowerCase() === 'bearer') {
            if (!token) throw {status: 401, message: "لطفا وارد حساب کاربری خود شوید"}
            const result = verifyToken(token)
            const {username} = result

            const user = await userModel.findOne({username}, {password: 0, __v: 0})
            if (!user) throw {status: 401, message: "لطفا وارد حساب کاربری خود شوید"}
            req.user = user
            return next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {checkLogin}