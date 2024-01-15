//traerse el modelo
const Font = require('../models/fontModel');
//codigos error
const HTTPSTATUSCODE = require('../utils/db');

//controlador para el get de todas las fuentes
const getFonts = async (req, res) => {
    try {
        const fonts = await Font.find();
        res.status(200).json({
            status: 200,
            message:HTTPSTATUSCODE[200],
            data: fonts //enviamos todas las fuentes
        });
    } catch (error) {
        next(error);
    }
}

//get de una por id
const getFont = async (req, res) => {
    try {
        const id = req.params.id;
        const font = await Font.findById(id);
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: font
        })
    } catch (error) {
        next(error)
    }
}

//subir una fuente
const postFont = async (req, res) => {
    try {
        const newFont = new Font(req.body);
        await newFont.save();
        res.status(201).json({
            status: 201,
            message:HTTPSTATUSCODE[201],
            data: newFont
        });

    } catch (error) {
        next(error);
    }
}

//actualizar una fuente por id
const putFont = async (req, res, next) => {
    try {
        const id = req.params.id;
        const putFont = new Font(req.body);
        putFont._id = id;
        const updatedFont = await Font.findByIdAndUpdate(id, putFont, {new: true}); //new true permite que se devuelva el documento DESPUES de la actualización

        if(!updatedFont) {
            return res.status(404).json({message: HTTPSTATUSCODE[404]})
        }

        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: updatedFont
        })

    } catch (error) {
        next(error);
    }
}

//borrar una fuente por id
const deleteFont = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFont = await Font.findByIdAndDelete(id);
        if(!deletedFont) {
            return res.status(404).json({message: HTTPSTATUSCODE[404]});
        }

        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: deletedFont
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: HTTPSTATUSCODE[500]
        })
    }
}

module.exports = {
    getFonts,
    getFont,
    postFont,
    putFont,
    deleteFont
}