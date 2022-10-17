const express = require('express');
const productosRouter = require('./productos');
const formularioRouter = require('./formulario')

const router = express.Router();

router.use('/productos', productosRouter);
router.use('/formulario', formularioRouter);

module.exports = router;