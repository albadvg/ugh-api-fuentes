const express = require('express');
//traer controladores
const {getFonts, getFont, postFont, putFont, deleteFont} = require('../controllers/fontControllers');
//función de autenticación
const {isAuth} = require('../middlewares/authMiddleware');

//crear router
const fontsRouter = express.Router();

fontsRouter.get('/', getFonts);
fontsRouter.get('/:id', getFont);
fontsRouter.post('/', [isAuth] , postFont);
fontsRouter.put('/:id', [isAuth], putFont);
fontsRouter.delete('/:id', [isAuth], deleteFont);

module.exports = fontsRouter;