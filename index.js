const dotenv = require('dotenv')
dotenv.config()
const Application = require('./app/server')

new Application(3000)