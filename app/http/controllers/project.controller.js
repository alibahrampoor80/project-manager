const {projectModel} = require("../../models/project");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const {title, text, image, tags} = req.body
            const owner = req.user._id
            const result = await projectModel.create({title, text, owner, image})
            if (!result) throw {status: 400, message: "افزودن پروژه با مشکل مواجه شد"}
            return res.status(201).json({status: 201, message: "پروژه با موفیقت ایجاد شد"})
        } catch (err) {
            next(err)
        }
    }

    async getAllProject(req, res, next) {
        try {
            const owner = req.user._id
            const projects = await projectModel.find({owner})
            return res.status(200).json({
                status: 200,
                projects
            })
        } catch (err) {
            next(err)
        }
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