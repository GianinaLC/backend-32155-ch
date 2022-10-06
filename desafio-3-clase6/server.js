const express = require('express')
const app = express();

const Contenedor = require('./contenedor')
const data = new Contenedor("./productos.json")

app.get('/', (req, res) => {
    res.send('<h1> Bienvenido a la ruta raiz, coloca /productos o /productosRandom </h1>')

})

app.get('/productos', async (req, res) => {
    let response;
    try {
        response = await data.getAll()
    } catch (err) {
        console.log(err)
    }

    res.json(`Los productos de la lista son: ${JSON.stringify(response)}`)

})

app.get('/productoRandom', async (req, res) => {
    try {
        let response = await data.getAll();

        let min = 1;
        let max = response.length;

        let id = Math.floor(Math.random() * (max - min) + min);
        let finalData = await data.getById(id);

        res.send(finalData)

    } catch (err) {
        console.log(err)
    }

})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', (error) => console.log(`Error en servidor ${error}`))