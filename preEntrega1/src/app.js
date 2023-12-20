import express  from "express";
import {Server, Socket} from "socket.io";

import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import handlebars from "express-handlebars";
import ProductManager from "./classes/productManager.js";

import viewsRouter from "./routes/views.router.js"

const app = express();
const PORT = 8080; //para reusar codigo, las const esas se ponen en mayuscula, Cuando me guarda un valor
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("src/public"));
app.get("/", (req, res) => {
    res.send("");
})
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use ("/", viewsRouter);

//configuracion de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use(function(req, res, next){
    req.io = io;
    next ()
})

const server = app.listen(PORT, (error)=>{ //escucha el puerto (si no se lo paso agarra el q encuentre disponible) y callBack
    if(error) {
        console.error(error);
    } else{console.log(`Servidor activo en localhost: ${PORT}`);}    
});

const io = new Server(server); 

io.on("Connection", (socket)=>{
     console.log("Nuevo cliente conectado!!");
 })
