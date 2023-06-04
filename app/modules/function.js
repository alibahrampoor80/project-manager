const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

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

function createUploadPath() {
    let d = new Date()
    const Year = "" + d.getFullYear()
    const Month = "" + d.getMonth()
    const day = "" + d.getDay()
    const uploadPath = path.join(__dirname, "..", "..", "public", "uploads", Year, Month, day)
    fs.mkdirSync(uploadPath, {recursive: true})
    return path.join("public", "uploads", Year, Month, day)
}


module.exports = {
    hashPassword,
    comparePassword,
    signToken,
    verifyToken,
    createUploadPath
}