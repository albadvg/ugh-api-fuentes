const express = require('express');
const userRouter = express.Router();
const { createUser, authenticate, logout, getUsers, deleteUser } = require("../controllers/userController");
const { isAuth } = require("../middlewares/authMiddleware")


userRouter.post("/registro", createUser);
userRouter.post("/autenticar", authenticate);
userRouter.post("/cerrar-sesion", logout);
userRouter.get("/", getUsers); //solo desarrollo, borrar
userRouter.delete("/:id", deleteUser);

module.exports =  userRouter; 