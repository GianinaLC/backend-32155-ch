const { Router } = require('express')
const { CartController } = require('../controllers/cart');
const { ProductsController } = require('../controllers/product');
const { isAdmin } = require('../middlewares/checkAdmin')

const router = Router()

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

router.get('/:id/products', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const response = await CartController.getCartById(id)
        const data = await response
        res.json({ 'Productos del carrito': data.products });

    } catch (err) {
        next(err);
    }
});

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

//le paso solo el id en el body (id del producto cargado en products.json)
// POST: '/:id/products' - Para incorporar productos al carrito por su id de producto
router.post('/:id/products', isAdmin, async (req, res, next) => {
    try {
        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.body.id);
        const cartSelected = await CartController.getCartById(cartId);
        const productToAdd = await ProductsController.getById(productId);
        await CartController.addProdInCart(cartSelected.id, productToAdd);
        return res.status(201).json({
            msg: "producto agregado al carrito con éxito",
        });

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