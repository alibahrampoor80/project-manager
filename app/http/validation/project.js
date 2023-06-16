const {body} = require("express-validator");

function createProjectValidator() {
    return [
        body('title').notEmpty().withMessage('عنوان پروژه نمیتواند خالی باشد'),
        body('text').notEmpty().isLength({min: 20})
            .withMessage('توضیحات پروژه نمیتواند خالی باشد حداقل باید 20 کارکتر باشد'),
        body('tags').isArray({min: 0, max: 10}).withMessage("تگ کترین 0 و بیشترین 10 تا میتواد باشد")
    ]
}

module.exports = {
    createProjectValidator
}