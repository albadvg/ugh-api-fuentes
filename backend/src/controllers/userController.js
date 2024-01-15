const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

const createUser = async (req, res, next) => {
    try {
        //puedo ponerlo así?
        // const user = new User({
        //     usuario: req.body.usuario,
        //     contrasena : req.body.contrasena
        // })
        const user = new User();
        user.usuario = req.body.usuario;

        //proteger contraseña antes de guardarla en BD
        const salt = 10;
        user.contrasena = await bcrypt.hash(req.body.contrasena, salt);

        //si ya existe un usuario con ese usuario, enviar error
        if (await User.findOne({ usuario: req.body.usuario })) {
            return res.status(400).json({
                status: 400,
                message: HTTPSTATUSCODE[400],
                data: null
            })
        }
        //sinó, guardar usuario
        await user.save();
        return res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: null
        });
    } catch (error) {
        next(error);
    }
}

const authenticate = async (req, res, next) => {
    try {
        const userInfo = await User.findOne({ usuario: req.body.usuario })
        //comprueba si la contraseña que te envían coincide con la que tienes guardada de ese usuario
        if (bcrypt.compareSync(req.body.contrasena, userInfo.contrasena)) {
        // if (userInfo.contrasena == req.body.contrasena) {
            userInfo.contrasena = null
            const token = jwt.sign(
                {
                    id: userInfo._id,
                    usuario: userInfo.usuario
                },
                req.app.get("secretKey"),
                { expiresIn: "1d" }
            );

            //devuelvo el token y usuario, con la contraseña null
            return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { user: userInfo, token: token },
            });
        } else {
            return res.json({
                status: 400,
                message: HTTPSTATUSCODE[400],
                data: null
            });
        }
    } catch (error) {
        return next(error);
    }
}

//para logout sobreescribimos su token con un null
const logout = (req, res, next) => {
    try {
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            token: null
        });
    } catch (error) {
        return next(error)
    }
}


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: users
        });

    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: deleteUser
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    authenticate,
    logout,
    getUsers,
    deleteUser
}