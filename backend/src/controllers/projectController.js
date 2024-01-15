const Project = require('../models/projectModel');
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('fuentes');
        res.status(200).json({
            status: 200,
            message:HTTPSTATUSCODE[200],
            data: projects 
        });
    } catch (error) {
        next(error);
    }
}

const getProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findById(id);
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: project
        })
    } catch (error) {
        next(error)
    }
}

const postProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({
            status: 201,
            message:HTTPSTATUSCODE[201],
            data: newProject
        });

    } catch (error) {
        next(error);
    }
}

const addFont = async (req, res) => {
    const {project_id, font_id} = req.body;

    if(!project_id || !font_id) {
        return res.status(404).json({
            status: 404,
            message: HTTPSTATUSCODE[404],
            data: req.body
        })
    }

    try {
        const project = await Project.findById(project_id);
        const font = await Project.findById(font_id);

        if(project && font) {
            project.recursos.fuentes.push(font_id);
            await project.save()
            res.status(201).json({
                status: 201,
                message:HTTPSTATUSCODE[201],
                data: project
            });
        }
    } catch (error) {
        
    }
}

const putProject = async (req, res, next) => {
    try {
        const id = req.params.id;
        const putProject = new Project(req.body);
        putProject._id = id;
        const updatedProject = await Font.findByIdAndUpdate(id, putProject, {new: true}); //new true permite que se devuelva el documento DESPUES de la actualización

        if(!updatedProject) {
            return res.status(404).json({message: HTTPSTATUSCODE[404]})
        }

        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: updatedProject
        })

    } catch (error) {
        next(error);
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProject = await Font.findByIdAndDelete(id);
        if(!deletedProject) {
            return res.status(404).json({message: HTTPSTATUSCODE[404]});
        }

        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: deletedProject
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: HTTPSTATUSCODE[500]
        })
    }
}

module.exports = {
    getProjects,
    getProject,
    postProject,
    addFont,
    putProject,
    deleteProject
}