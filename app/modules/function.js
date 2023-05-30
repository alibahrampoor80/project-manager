const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed)
}

function signToken(payload) {
    const secret = process.env.SECRET
    return jwt.sign(payload, secret, {expiresIn: '10d'})
}


function verifyToken(token) {
    const result = jwt.verify(token, process.env.SECRET)
    if (!result?.username) throw {status: 401, message: "لطفا وارد حساب کاربری خود شوید"}
    return result
}

module.exports = {
    hashPassword,
    comparePassword,
    signToken,
    verifyToken
}