/*PAQUETES EXTERNOS*/
const express = require('express');
const dotenv = require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const logger = require('morgan');

/*MÓDULOS PROPIOS*/
const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const connectMongo = require('./utils/db');
/*rutas*/
const fontsRouter = require('./src/routes/fontRoutes');
const usersRouter = require('./src/routes/userRoutes');
const projectsRouter = require('./src/routes/projectRoutes');

/*TRAER VARIABLES SENSIBLES*/
//carga las variables de .env en la variable global process.env de modo que están ocultas pero disponibles en todo el programa
const PORT = process.env.PORT;

/*CONECTAR CON BASE DE DATOS*/
connectMongo();

/*INICIAR SERVIDOR*/
const app = express();
app.use(cors());

/*CONFIGURACIÓN ENCABEZADOS CORS*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Acess-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(express.json()); //interpretar peticiones en json
app.use(express.urlencoded({extended: true}));//codificar urls en base al estandar

/*SANEAR PETICIONES*/
mongoSanitize();

/*loggear por consola info de la request con el formato predefinido "dev"*/
app.use(logger('dev'));
/*esto crea una variable llamada secretKey, con un valor nodeRestApi, pero no se para qué*/
/*creo que es una clave que se usa para firmar y verificar el jwt*/
app.set('secretKey', 'nodeRestApi');

/*RUTAS*/
app.use('/api/fuentes', fontsRouter);
app.use('/api/usuario', usersRouter);
app.use('/api/proyectos', projectsRouter);
app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 200,
    data: {
      method: "GET",
      message: "Bienvenido a la app. Estás en la ruta base",
    },
    })
})

/*desactivar el encabezado http x-powered-by, que muestra la tecnología con que se desarrolló la api*/
app.disable('x-powered-by');

/*MANEJO DE ERRORES*/
app.use((req, res, next) => {
    let error = new Error();
    error.status = 404;
    error.message = HTTPSTATUSCODE[404];
    next(error);
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

/*ESCUCHAR PUERTO*/
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
})

/*just a cute comment for commiting*/



