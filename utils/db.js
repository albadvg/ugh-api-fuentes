const mongoose = require('mongoose');

//traer url guardada como variable de entorno
const DB_URL = process.env.DB_URL;

//función de conexión
const connectMongo = async () => {
    try {
        const db = await mongoose.connect(DB_URL);
        const {name, host} = db.connection; //destructuring del objeto db.connection
        console.log(`conexión a BD realizada con éxito a la BD: ${name} , host: ${host}`);
    } catch (error) {
        console.log('error de conexión a BD', error);
    }
}

module.exports = connectMongo;