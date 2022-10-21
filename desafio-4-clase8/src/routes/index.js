const express = require('express');
const productosRouter = require('./productos');

const router = express.Router();
router.use('/productos', productosRouter);

module.exports = router;