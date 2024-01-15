const jwt = require("jsonwebtoken")
const HTTPSTATUSCODE = require('../utils/httpStatusCode');

const isAuth = (req, res, next) => {
    //coger la cabecera con el token
    const authorization = req.headers.authorization
    //si no existe mandar error
    if (!authorization) {
        return res.json({
            status: 401,
            message: HTTPSTATUSCODE[401],
            data: null
        });
    }
    //separar Bearer del token en si
    const splits = authorization.split(" ")
    //si no tiene el formato correcto enviar error
    if (splits.length != 2 || splits[0] != "Bearer") {
        return res.json({
            status: 400,
            message: HTTPSTATUSCODE[400],
            data: null
        });
    }
    //esto es el token en si
    const jwtString = splits[1]

    //comprueba la validez del token
    try {
        var token = jwt.verify(jwtString, req.app.get("secretKey"));
    } catch (error) {
        return next(error)
    }

    //extraer del token el nombre e id del usuario
    const authority = {
        id: token.id,
        name: token.name
    }
    req.authority = authority
    next()
}

//exportar función
module.exports = {
    isAuth,
}