const {default: mongoose} = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, required: true, unique: true},
    mobile: {type: String, required: true, unique: true},
    roles: {type: [String], default: ['USER']},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true,},
    skills: {type: [String], default: []},
    team: {type: [mongoose.Types.ObjectId], default: []},

}, {timestamps: true})
const userModel = mongoose.model('user', userSchema)
module.exports = {userModel}


