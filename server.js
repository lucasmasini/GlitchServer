import express from 'express';
import { container } from './products.js';
const app = express();
import fs from 'fs';
const PORT = 8080;


// Funcion que obtiene un numero random dependiendo de la longitud del array de productos
const getRandomProduct = ()=>{
    let productsJSON = fs.readFileSync('./products.txt');
    let products = JSON.parse(productsJSON);
    let index = 0;
    products.map((element) => index++)
    let randomProduct = Math.floor(Math.random() * index) + 1;
    return randomProduct;

}

//Declarando el nuevo contendor de la clase container, que tiene los metodos
let productsArchive = new container("./products.txt");


// Prueba de que al agregar un nuevo producto, lo mustra y entra en el productRandom

// let newProduct = {
//     title: 'Lapiz',
//     price: 400,
//     thumbnail: "https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg",
// }
// productsArchive.save(newProduct)
//     .then((result)=>{
//         console.log(result);
//     })
//     .catch((error)=>{
//         console.log(error);
//     });


//Metodos GET con sus respuestas
app.get('/',(req,res)=>{
    res.send('<h1> Utilizar las rutas "/productos" o "/productoRandom" para acceder al contenido </h1>');
});

app.get('/productos',(req,res)=>{    
    productsArchive.readFile()
        .then((products) => res.send(products))
        .catch((error)=> res.send(`no se pudo obtener los produtos por este error ${error}`));
});

app.get('/productoRandom',(req,res)=>{
    productsArchive.getById(getRandomProduct())
        .then((result)=> res.send(result))
        .catch((error)=> res.send(`no se pudo obtener los produtos por este error ${error}`));
});



//Iniciando el servidor
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`);
})