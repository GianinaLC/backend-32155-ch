const fs = require("fs");
const filePath = "./productos.json";

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(element) {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.archivo}`,
        "utf-8"
      );
      const data = JSON.parse(contenido);

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

      try {
        await fs.promises.writeFile(
          `${this.archivo}`,
          JSON.stringify(data, null, 4)
        );
        console.log(`Nuevo producto guardado, N° ID: ${nuevoProducto.id}`);
      } catch {
        console.log("error cargar nuevo producto");
      }

      return nuevoProducto.id;
    } catch (err) {
      console.log("Error en save", err);
      throw new Error(err);
    }
  }

  //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(id) {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.archivo}`,
        "utf-8"
      );
      const data = JSON.parse(contenido);
      const idProducto = data.find((producto) => producto.id === id);
      if (!idProducto) throw new Error("No existe ese producto");

      return idProducto;
    } catch (err) {
      console.log("Error en getById", err);
      throw new Error(err);
    }
  }

  //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const data = JSON.parse(contenido);

      return data;
    } catch {
      console.log("Error al obtener todos los datos");
    }
  }

  // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("No se pasó ningún ID");
      }

      const contenido = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      const data = JSON.parse(contenido);
      const producto = data.find((producto) => producto.id === id);

      if (!producto) {
        throw new Error("No existe ese producto");
      } else {
        data.splice(data.indexOf(producto), 1);

        const nuevaLista = await fs.promises.writeFile(
          `./${this.archivo}`,
          JSON.stringify(data, null, 4)
        );

        console.log(`Producto eliminado, ID: ${producto.id}`);

        return nuevaLista;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.archivo}`, "[]");
      console.log("Archivo eliminado");
    } catch (err) {
      console.log(`No se pudo eliminar el archivo`, err);
    }
  }
}

const data1 = new Contenedor(filePath);

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

module.exports = Contenedor;