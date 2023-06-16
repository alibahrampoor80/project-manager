const {projectModel} = require("../../models/project");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const {title, text, image, tags} = req.body
            console.log(tags)
            const owner = req.user._id
            const result = await projectModel.create({title, text, owner, image, tags})
            if (!result) throw {status: 400, message: "افزودن پروژه با مشکل مواجه شد"}
            return res.status(201).json({status: 201, message: "پروژه با موفیقت ایجاد شد"})
        } catch (err) {
            next(err)
        }
    }

    getAllProject() {
    }

    getProjectById() {
    }

    getAllProjectOfTeam() {
    }

    getProjectOfUser() {
    }

    updateProject() {
    }

    removeProject() {
    }
}

module.exports = {ProjectController: new ProjectController()}