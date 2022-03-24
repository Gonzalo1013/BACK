class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(especie, nombreMascota){
        this.mascotas.push({especie: especie, nombre: nombreMascota})
        return this.mascotas
    }
    countMascotas(){
        return this.mascotas.length - 1
    }
    addBook(nombreLib, autor){
        this.libros.push({libro: nombreLib, autor: autor})
        return this.libros
    }
    getBookNames(){
        return this.libros.map(nombreLib => nombreLib.libro)
    }
}

let libros = [];
let mascotas = [];

let usuario2 = new Usuario("Gonzalo","Arroyo", libros , mascotas)


usuario2.addMascota("perro", "Ozzy")
usuario2.addMascota("Gato", "Bambi")
usuario2.addBook("Guerra y Paz", "Tolkien")
usuario2.addBook("Batman", "DC")

console.log(usuario2.getFullName());
console.log(usuario2.addMascota());
console.log(usuario2.countMascotas());
console.log(usuario2.addBook());
console.log(usuario2.getBookNames());