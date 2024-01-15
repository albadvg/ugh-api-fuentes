const express = require('express');

const {getProjects, getProject, postProject, addFont, putProject, deleteProject} = require('../controllers/projectController')

const {isAuth} = require('../middlewares/authMiddleware');

const projectsRouter = express.Router();

projectsRouter.get('/', getProject);
projectsRouter.get('/:id', getProjects);
projectsRouter.post('/', [isAuth] , postProject);
projectsRouter.put('/:id', [isAuth], putProject);
projectsRouter.delete('/:id', [isAuth], deleteProject);

module.exports = projectsRouter;