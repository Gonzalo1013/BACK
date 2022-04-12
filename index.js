// let contenedor = require("./backend.js")

const fs = require("fs")
// const path = require("path")

const express = require("express")
const app = express()
const server = app.listen(8080, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

        app.get('/', (req, res) =>{
            let dia = new Date()
            res.send(`<h1 style="color: red">Hola Mundo!!</h1> <h3>Hoy es ${dia.toDateString()}  y son las ${dia.toLocaleTimeString()}</h3>`)
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
        
        app.get('/productosRamdom', (req, res) =>{
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
        