const {projectModel} = require("../../models/project");
const {createLinkForFiles} = require("../../modules/function");

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
            for (const project of projects) {
                project.image = createLinkForFiles(project.image, req)
            }
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
            project.image = createLinkForFiles(project.image, req)
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
            const deleteProjectResult = await projectModel.deleteOne({_id: projectId});
            if (deleteProjectResult.deletedCount == 0) throw {status: 400, message: "پروژه حذف نشد"}
            return res.status(200).json({
                status: 200,
                success: true,
                message: "پروژه با موفقیت حذف شد"
            })
        } catch (err) {
            next(err)
        }
    }


    async updateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectId = req.params.id;
            const project = await projectModel.findOne({owner, _id: projectId})
            if (!project) throw {status: 404, message: "پروژه ای یافت نشد"}
            const data = {...req.body};
            Object.entries(data).forEach(([key, value]) => {
                if (!["title", "text", "tags"].includes(key)) delete data[key];
                if (["", " ", 0, null, undefined, NaN].includes(value)) delete data[key]
                if (key == "tags" && (data['tags'].constructor === Array)) {
                    data["tags"] = data["tags"].filter(val => {
                        if (!["", " ", 0, null, undefined, NaN].includes(val)) return val
                    })
                    if (data['tags'].length == 0) delete data['tags']
                }
            })
            const updateResult = await projectModel.updateOne({_id: projectId}, {$set: data})
            if (updateResult.modifiedCount == 0) throw {status: 400, message: "به روز رسانی انجام نشد"}
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روز رسانی با موفقیت انجام شد"
            })
        } catch (err) {
            next(err)
        }
    }

    async updateProjectImage(req, res, next) {
        try {
            const {image} = req.body
            const owner = req.user._id;
            const projectId = req.params.id
            const project = await projectModel.findOne({owner, _id: projectId})
            if (!project) throw {status: 404, message: "پروژه ای یافت نشد"}
            const updateResult = await projectModel.updateOne({_id: projectId}, {$set: {image}})
            if (updateResult.modifiedCount == 0) throw {status: 400, message: "بروزرسانی انجام نشد"}
            return res.status(200).json({
                status: 200,
                message: "بروزرسانی با موفقیت انجام شد"
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

    async getProjectOfUser(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }


}

module.exports = {ProjectController: new ProjectController()}