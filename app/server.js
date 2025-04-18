const {default: mongoose} = require('mongoose')
const http = require('http')
const path = require('path')
const {allRoutes} = require("./routes/router");
const morgan = require('morgan')
const cors = require("cors");
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger')

module.exports = class Application {
    #express = require('express')
    #app = this.#express()
    #DB_URL = process.env.DB_URL || 'mongodb+srv://ali_bahrampoor:7St1YjKvE6uDXRNd@cluster0.hnkf9.mongodb.net/projectManager'

    constructor(PORT) {
        this.configDataBase()
        this.configApplication()
        this.createServer(PORT)
        this.createRoutes()
        this.errorHandler()
    }

    configApplication() {
        this.#app.use(
            cors({credentials: true, origin: process.env.ALLOW_CORS_ORIGIN})
        );
        this.#app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.#app.use(this.#express.json())
        this.#app.use(this.#express.urlencoded({extended: true}))
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
        // this.#app.use(this.#express.)
        this.#app.use(morgan('dev'))
    }

    createServer(PORT) {
        const server = http.createServer(this.#app)
        server.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    }

    configDataBase() {
        mongoose.connect(this.#DB_URL).then(() => {
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
                message: "this is application project manager - created by ali bahrampoor",
                swagger_document: "coming soon..."
            })
        })
        this.#app.use(allRoutes)
        // this.#app.use((err, req, res, next) => {
        //     try {
        //         this.#app.use(allRoutes)
        //     } catch (err) {
        //         next(err)
        //     }
        // })
    }
}