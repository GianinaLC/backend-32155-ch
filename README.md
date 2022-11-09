# Backend - Coderhouse - Comisión 32155

## Clase 14 - desafío 8 / Primera Entrega del proyecto


### El router base '/api/products' implementará:


http://localhost:8080/api/products
GET: '/' - Muestra todos los productos (disponible para usuarios y administradores)


http://localhost:8080/api/products/1
GET: '/:id?' - Muestra el producto según su ID (disponible para usuarios y administradores)


http://localhost:8080/api/products
POST: '/' - Para incorporar productos al listado (disponible para administradores)
Datos a ingresar:


    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "stock": 3
    }


http://localhost:8080/api/products/2
PUT: '/:id' - Actualiza un producto por su ID (disponible para administradores)
Ingresar en la ruta el id del producto a cambiar e ingresar los datos

    {
        "title": "Gaseosa",
        "price": 420,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "stock": 5
    }


http://localhost:8080/api/products/2
DELETE: '/:id' - Borra un producto por su ID (disponible para administradores)


### El router base '/api/cart' implementará para usuarios y administradores:


http://localhost:8080/api/cart
POST: '/' - Crea un carrito y devuelve su id.
Le pasamos los datos del producto a guardar en el carrito


    {
        "id":1,
        "title": "Globo terráqueo",
        "price": 345,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "timestamp": "07-11-2022 11:11:10",
        "codigo": "11d277a7-28f4-45ef-9471-558d9e6e51c5",
        "stock": 3
    }


http://localhost:8080/api/cart/2/products
POST: '/:id/products' - Para incorporar productos al carrito por su id de producto
Le pasamos el id del producto que queremos enviar al carrito y que se encuentra en productos.json

    {
        "id": 3
    }


http://localhost:8080/api/cart/2/products
GET: '/:id/products' - Me permite listar todos los productos guardados en el carrito


http://localhost:8080/api/cart/2/products/1
DELETE: '/:id/products/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto


http://localhost:8080/api/cart/2
DELETE: '/:id' - Vacía un carrito y lo elimina.



Clase 10 - desafío 5


Se nos dió a elegir uno de los tres motores de plantillas, HBS PUG EJS.
Elegí PUG ya que requiere menos configuración y su sintaxis es mas corta.