import express  from "express";
// import ProductManager from "./classes/productManager";
import productRouter from './routes/products.router.js';


const app = express();
//const productManager = new ProductManager();
const PORT = 8080; //para reusar codigo, las const esas se ponen en mayuscula, Cuando me guarda un valor

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
    res.send("");
})
app.use('/api/products', productRouter);

app.listen(PORT, (error)=>{ //escucha el puerto (si no se lo paso agarra el q encuentre disponible) y callBack
    if(error) {
        console.error(error);
    } else{console.log(`Servidor activo en localhost: ${PORT}`);}    
});