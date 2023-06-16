const {projectModel} = require("../../models/project");

class ProjectController {

    async findProject(projectId, owner) {
        const project = await projectModel.findOne({owner, _id: projectId})
        if (!project) throw {status: 404, message: "پروژه ای یافت نشد"}
        return project
    }

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

    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id
            const projectId = req.params.id
            const project = await projectModel.findOne({owner, _id: projectId})
            if (!project) throw {status: 404, message: "پروژه ای یافت نشد"}
            return res.status(200).json({status: 200, project})
        } catch (err) {
            next(err)
        }
    }

    async removeProject(req, res, next) {
        try {
            const owner = req.user._id
            const projectId = req.params.id
            await projectModel.findOne({owner, _id: projectId})
            const deleteProjectResult = await projectModel.deleteOne({_id : projectId});
            if(deleteProjectResult.deletedCount == 0) throw {status : 400, message : "پروژه حذف نشد"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "پروژه با موفقیت حذف شد"
            })
        } catch (err) {
            next(err)
        }
    }

    async getAllProjectOfTeam(req, res, next) {
        try {

        } catch (err) {

        }
    }

    getProjectOfUser() {
    }

    updateProject() {
    }


}

module.exports = {ProjectController: new ProjectController()}