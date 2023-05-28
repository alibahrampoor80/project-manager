const bcrypt = require("bcrypt");

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function generatePassword() {
}

module.exports = {
    hashPassword
}