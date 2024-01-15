const mongoose = require('mongoose');

//crear esquema para fuente
const fontSchema = new mongoose.Schema({
    nombre : {type: String, required:true, trim:true},
    serifa: {type: Boolean, required: true},
    clasificacion: {type: String, required: true, trim:true, enum: ["antigua", "transicion", "moderna", "egipcia", "grotesca", "neo-grotesca", "geometrica", "humanista", "caligrafica", "gotica", "monoespacio", "decorativa", "otros"]},
    variantes: [{
        grosores : [{type: Number, trim:true,required: true}],
        italica : {type: Boolean, trim:true, required: true},
        grosores_it : [{type: Number, trim:true, required: true}]
    }],
    diseño: [{type: String, trim:true, required: true}],
    link: {type: String, trim:true, required: true},
    ejemplos: {type: String, trim:true, required: true}
})

//crear modelo. El primer parámetro es el nombre de tu tipo de dato. Mongoose busca automáticamente una colección en la BD que sea la versión en plural y minúsculas de este string. 
const Font =  mongoose.model('Fuente', fontSchema);

//exportar esquema para requerirlo en controllers
module.exports = Font;