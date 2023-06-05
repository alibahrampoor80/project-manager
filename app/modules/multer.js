const multer = require('multer')
const {createUploadPath} = require("./function");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createUploadPath())
    },
    filename: (req, file, cb) => {
        // const type = path.extname(file?.originalname || "")
        // cb(null, Date.now() + type)
        const ext = path.extname(file.originalname)
        const whiteListFormat = ['.png', '.jpg', '.jpeg', '.webp', '.JPG']
        if (whiteListFormat.includes(ext)) {
            const filename = Date.now() + ext
            cb(null, filename)
        } else {
            cb(new Error('فقط عکس مجاز است'))
        }
    }
})

const _1MB = 1000 * 1000
const _2MB = 2 * 1000 * 1000
const _3MB = 2 * 1000 * 1000
const _750KB = 150000

const uploadMulter = multer({
    storage,
    limits: {
        fileSize: _2MB
    }
})
module.exports = {uploadMulter}