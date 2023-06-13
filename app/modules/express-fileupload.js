const fileUpload = require('express-fileupload')
const path = require("path");
const {createUploadPath} = require("./function");
const uploadFile = async (req, res, next) => {
    try {

        if (req.file || Object.keys(req.files).length == 0) throw {
            status: 400,
            message: "تصویر شاخص پروژه را ارسال نمایید"
        }
        let image = req.files.image
        const imageUrl = path.join(createUploadPath() + Date.now() + path.extname(image.name))
        req.body.image = imageUrl
        let uploadPath = path.join(__dirname, "..", "..", imageUrl)
        image.mv(uploadPath, (err) => {
            if (err) throw {status: 500, message: "بارگزاری عکس انجام نشد"}
            next()
        })
    } catch (err) {
        next(err)
    }
}
module.exports = {
    uploadFile

}