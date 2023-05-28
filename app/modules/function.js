const bcrypt = require("bcrypt");

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed)
}


module.exports = {
    hashPassword,
    comparePassword
}