const fileUpload = require('express-fileupload')
const path = require("path");
const {createUploadPath} = require("./function");
const uploadFile = async (req, res, next) => {
    try {
        fileUpload()
        if (Object.keys(req.file).length == 0) throw {status: 400, message: "تصویر شاخص پروژه را ارسال نمایید"}
        let image = req.file
        let uploadPath = path.join(__dirname, "..", "..", createUploadPath())
        console.log(uploadPath)
        image.mv()(uploadPath, (err) => {
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