const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    nombre : {type: String, trim:true, required: true},
    cliente: {type: String, trim: true, required: true},
    fecha_inicio: {type: Date, required: true, trim: true},
    recursos: {
        fuentes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Fuente', required: true}] //o Font?
    }
})

const Project = mongoose.model('Proyecto', projectSchema);

module.exports = Project;