//endpoints
const { Router } = require('express')
const { ProductsController } = require('../controllers/contenedor')

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        let response = await ProductsController.getAll()
        res.json(response)

    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let response = await ProductsController.getById(id)

        res.json(response);

    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const dato = req.body
        let response = await ProductsController.save(dato)

        res.json({ msg: `Nuevo producto guardado ID: ${response}` });

    } catch (err) {
        next(err);
    }
});






router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        console.log(id)
        await ProductsController.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }

});

module.exports = router