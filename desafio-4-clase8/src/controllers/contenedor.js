const fs = require('fs');
/* const path = require('path')
const filePath = path.resolve(__dirname, "../productos.json");
console.log("prueba1 " + filePath) //me produce error en getbyId con ENOENT ruta */

//////////
/* a la ruta de los productos lo tuve que hacer así por un error de ENOENT que me salía */
////////////
const filePath = '../desafio-4-clase8/src/productos.json';
/* const filePath = "../desafio-4-clase8/src/productos2.json"; */


class Contenedor {
	constructor(archivo) {
		this.archivo = archivo;
	}

	async validateExistFile() {
		try {
			await fs.promises.stat(`${this.archivo}`)
		} catch (err) {
			await fs.promises.writeFile(`${this.archivo}`, JSON.stringify([]));
		}
	}

	async readFileFn() {
		await this.validateExistFile();
		const contenido = await fs.promises.readFile(`${this.archivo}`, 'utf-8');
		return JSON.parse(contenido);
	}

	async saveProducts(productos) {
		await this.validateExistFile();
		const data = JSON.stringify(productos, null, 4)
		await fs.promises.writeFile(this.archivo, data)
	}

	//save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
	async save(element) {

		if (!element.title || !element.price || typeof element.title !== 'string' || typeof element.price !== 'number') throw new Error('Datos invalidos');

		const data = await this.readFileFn();
		let id = 1;

		if (data.length) {
			//Si tengo elementos en mi array
			id = data[data.length - 1].id + 1;
		}

		const nuevoProducto = {
			title: element.title,
			price: element.price,
			thumbnail: element.thumbnail,
			id: id,
		};

		data.push(nuevoProducto);

		await this.saveProducts(data)
		console.log(`Nuevo producto guardado, N° ID: ${nuevoProducto.id}`);

		return nuevoProducto.id;
	}


	//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		const data = await this.readFileFn()
		const idProducto = data.find((producto) => producto.id === id);

		if (!idProducto) throw new Error("No existe ese producto");

		return idProducto;

	}

	//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
	async getAll() {
		try {
			const data = this.readFileFn();
			return data

		} catch {
			console.log('Error al obtener todos los datos');
		}
	}


	// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
	async deleteById(id) {
		const data = await this.readFileFn()

		const productoId = data.findIndex((producto) => producto.id === id);

		if (productoId < 0) {
			throw new Error('El producto no existe');
		}

		data.splice(productoId, 1);

		await this.saveProducts(data)

	}

	async deleteAll() {
		await this.saveProducts([])
	}
}

/* const data1 = new Contenedor(filePath); */

//obtener producto segun el ID
/* data1.getById(1).then((val) => console.log(val)); */

//borrar archivo
/* data1.deleteAll(); */

//save
/* data1.save({ title: "lapicera", price: 222, thumbnail: "xx" });
 */


//getAll
/* data1.getAll().then((val) => console.log(val)); */

//deleteById
/* data1.deleteById(1); */


const instanciaProductsApi = new Contenedor(filePath)

module.exports = {
	ProductsController: instanciaProductsApi
} 
