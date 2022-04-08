

//Servidor con http
// const http = require("http")
// const server = http.createServer((peticion, respuesta)=>{
//     let dia = new Date();
//     console.log(dia);
//     respuesta.end(`<h1>Hola Mundo</h1> <h3>Hoy es ${dia.toDateString()}  y son las ${dia.toLocaleTimeString()}</h3>`);
// })

// const connectedServer = server.listen(8080, ()=>{
//     console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
// })
//---------------------------------

//Servidor con express!! 

let fs = require("fs")

const path = require("path")

const express = require("express")
const app = express()
const server = app.listen(8080, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
            //Con el metodo on podemos condifurar un evento "error" sobre la salida del "listen"
// server.on("Error!!", error => console.log(`Error en el servidor ${error}`))
            //Con el metodo Get podemos hacer hacer peticiones a la ruta raiz del servidor.
            app.get('/', (req, res) =>{
                let dia = new Date()
                res.send(`<h1 style="color: blue">Hola Mundo!!</h1> <h3>Hoy es ${dia.toDateString()}  y son las ${dia.toLocaleTimeString()}</h3>`)
            })

            app.get('/productos', (req, res) =>{
                fs.readFile("./text.json" , "utf-8", (err, data)=>{
                    if(err){
                        console.log("Error!!");
                    }else{
                        let newArr = JSON.parse(data)
                        res.send(newArr)
                    }
                })
                // res.sendFile(path.join(__dirname +  "/index.html"))
            })

            app.get('/ramdom', (req, res) =>{
                fs.readFile("./text.json" , "utf-8", (err, data)=>{
                    if(err){
                        console.log("Error!!");
                    }else{
                        let newArray = JSON.parse(data)
                        let ramdom = newArray[Math.floor(Math.random() * newArray.length)];
                        console.log(Math.floor(Math.random() * newArray.length));
                        res.send(ramdom)
                    }
                // res.send({message : 'Estae FyH!'})
            })
        })

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
        this.productos = []
    }

    
    save(obj){
        const stock = this.productos
        stock.push(obj)
        fs.readFile(`./${this.archivo}` , "utf-8" , (err, data) => {
            if(data === ""){
                console.log("El archivo esta vacio")
            fs.writeFile(`./${this.archivo}`, JSON.stringify(stock) , "utf-8", (err)=>{
                    if(err){
                        console.log("Hubo un problema, No se pudo crear el archivo.");
                    }else{
                        console.log("Se agrego contenido al Archivo correctamente");
                    }
                    const primerData = stock
                        primerData.forEach(element => {
                            console.log("el id asignado al producto es ="+" " + element.id);
                    })
                })

            }else{
                const dataFile = JSON.parse(data)
                // console.log("Productos existentes")
                // console.log(dataFile);
                let copy = JSON.parse(data)
                copy.push(obj)

                fs.unlink(`./${this.archivo}`, error =>{
                    if(error){
                        console.log("no se pudo renombrar");
                    }else{
                        console.log("se renombro correctamente");
                    }
                })
                fs.appendFile(`./${this.archivo}`, JSON.stringify(copy) , "utf-8", (err)=>{
                    if(err){
                        console.log("No se pudo agregar el producto a la lista");
                    }else{
                        console.log(`Se agrego ${obj.title} con Nº ID: ${obj.id}`);
                    } 
                    console.log("Lista de IDs");
                    copy.map(element => {
                        console.log(`Nombre: ${element.title}, ID: ${element.id}`);
                    })
                })
            }
        })
    }


    getById(numero){
        fs.readFile(`./${this.archivo}`, "utf-8" , (err,data)=>{
            if(err){
                console.log("Error en la busqueda");
            }else{
                const p = JSON.parse(data)
                const itemFound = p.find((item)=> item.id=== numero)
                if(itemFound){
                    console.log(itemFound);
                }else{
                    console.log("No se encontro ningun producto");
                }
            }
        })
    }


    getAll(){
        fs.readFile(`./${this.archivo}` , "utf-8" , (err, data)=>{
            if(err){
                console.log("Error, no se encontro la BD");
            }else {
                const arrayProductos = JSON.parse(data)
                console.log(arrayProductos);
            }
        })
    }


    deleteById(id){
            fs.readFile(`./${this.archivo}` , "utf-8" , (err, data)=>{
                if(err){
                    console.log("Error al leer el CallBack!")
                }else{
                    const array = JSON.parse(data)
                    const found = array.find((p)=> p.id === id)
                    if(found){
                        let index = array.indexOf(found)
                            if(index > -1){
                                let productoEliminado = array.splice(index,1)
                                const producto = JSON.stringify(productoEliminado)
                                const nuevoArray = array
                                fs.writeFile(`./${this.archivo}`, JSON.stringify(nuevoArray) ,"utf-8", (err)=>{
                                    if(err){
                                        console.log("Problemas al actualizar Stock");
                                    }else{
                                        console.log(`El producto ${producto} fue Eliminado del Stock`);
                                    }
                                })
                            }
                        }else{
                            console.log("No se encontro el producto a eliminar. ID incorrecto");
                        }
                    }
                })
            }

    deleteAll(){
        fs.unlink(`./${this.archivo}`, (error)=>{
            if(error){
                console.log("No se pudo elimar el Archivo");
            }else{
                console.log("Archivo eliminado");
            }
        })
    }


}
let archivos = new Contenedor("text.json");

const obj = {
    title: "Vasos",
    price: 150,
    img: "asdasd",
    id: numero()
}

function numero(){
    let num = Math.random()
    return num
}

// archivos.save(obj)
// archivos.getById(0.013950166364724792)
// archivos.getAll()
// archivos.deleteById(0.013950166364724792)
// archivos.deleteAll()


