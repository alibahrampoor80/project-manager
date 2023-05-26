const {default: mongoose} = require('mongoose')
const http = require('http')
const path = require('path')

module.exports = class Application {
    #express = require('express')
    #app = this.#express()

    constructor(PORT, DB_URL) {
        this.configDataBase(DB_URL)
        this.configApplication()
        this.createServer(PORT)
        this.createRoutes()
        this.errorHandler()

    }

    configApplication() {
        this.#app.use(this.#express.json())
        this.#app.use(this.#express.urlencoded({extended: true}))
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
    }

    createServer(PORT) {
        const server = http.createServer(this.#app)
        server.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    }

    configDataBase(DB_URL) {
        mongoose.connect(DB_URL).then(() => {
            console.log('connected to mongodb!!')
        }).catch((err) => {
            throw err
        })
    }

    errorHandler() {
        this.#app.use((req, res, next) => {
             res.status(404).json({
                status: 404,
                success: false,
                message: "آدرس مورد نطر یافت نشد"
            })
        })
        this.#app.use((err, req, res, next) => {
            const status = err?.status || 500
            const message = err?.message || "Internal error server"
             res.status(status).json({
                status,
                success: false,
                message
            })
        })
    }

    createRoutes() {
        this.#app.get("/", (req, res, next) => {
             res.json({
                message: "this is application project manager - created by ali bahrampoor"
            })
        })
    }
}