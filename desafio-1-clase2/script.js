class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }

  getFullName() {
    console.log(`Hola ${this.nombre} ${this.apellido}`);
  }

  addMascotas(elemento) {
    this.mascotas.push(elemento);
  }

  countMascostas() {
    console.log(this.mascotas.length);
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre, autor });
  }
  getBookNames() {
    console.log(this.libros.map((libro) => libro.nombre));
  }
}

let usuario1 = new Usuario("Gianina", "Carranzani");
usuario1.getFullName();
usuario1.addMascotas("Pipo");
usuario1.addMascotas("Luz");
usuario1.addMascotas("Paz");
usuario1.countMascostas();
usuario1.addBook("El señor de los anillos", "J R R Tolkien");
usuario1.addBook("El despertar de los dragones", "Morgan Rice");
usuario1.getBookNames();
