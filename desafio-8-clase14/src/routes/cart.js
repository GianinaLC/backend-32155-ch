const { Router } = require('express')
const { CartController } = require('../controllers/cart')
const { isAdmin } = require('../middlewares/checkAdmin')

const router = Router()

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

/* router.get('/:id/products', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let response = await CartController.getById(id)

        res.json({ msg: response });

    } catch (err) {
        next(err);
    }
}); */

//POST: '/' - Crea un carrito y devuelve su id.

router.post('/', isAdmin, async (req, res, next) => {
    try {
        const dato = req.body
        let response = await CartController.saveCart(dato)

        res.json({ msg: `Nuevo carrito guardado ID: ${response}` });

    } catch (err) {
        next(err);
    }
});

// POST: '/:id/products' - Para incorporar productos al carrito por su id de producto

router.post('/:id/products', isAdmin, async (req, res, next) => {
    try {
        const idCartSelected = parseInt(req.params.id)
        /*   if (isNaN(idCartSelected)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' }); */
        const productSaved = await CartController.saveProdInCart(idCartSelected, idProduct);
        /* if (!productSaved) return res.status(404).send({ message: 'Error' }); */

        res.json({ msg: `Nuevo producto guardado en carrito: ${productSaved}` });

    } catch (err) {
        next(err);
    }
});


/* 
router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const body = req.body
    try {
        let data = await CartController.updateById(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});



router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        await CartController.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }

}); */

module.exports = router