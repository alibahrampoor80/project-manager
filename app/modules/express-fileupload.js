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


        const extensionName = path.extname(image.name)

        if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(extensionName)) throw {
            status: 400,
            message: "ارسال عکس فقط مجاز میباشد"
        }
        if (image.size > 1024 * 1024) throw {
            status: 400,
            message: "حجم عکس ارسالی از 1 مگابایت بیشتر است"
        }

        const imageUrl = path.join(createUploadPath() + (Date.now() + extensionName))
        req.body.image = imageUrl.substring(7)
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