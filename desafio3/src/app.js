import express  from "express";
import ProductManager from "./productManager.js";



const app = express();
const productManager = new ProductManager();
const PUERTO = 8080; //para reusar codigo, las const esas se ponen en mayuscula, Cuando me guarda un valor

app.get('/api/products', async (req, res) => {
    try {
        const { limit } = req.query; //query es el obj con la variable del limite 
         const products = await productManager.getProduct(); //await porque get prod es asincronica

        if (!limit) { // que nos arroja si no esta definido, muestra todos
            res.status(200).send({ //200 es rta exitosa
                success: true, //objeto
                productos: products, //que va a mostrar? la lista sin limites 
            });
            return
        }
        res.status(200).send({ 
            success:true,
            productos: products.filter((product) => product.id <= limit), //muestra los productos que el id esta dentro del limit piesto
        });
    } catch (error){ //si no hay prod
        console.error(error);
        res.status(400).send({ //codigo de error, no hay exito
            success:false, //objeto sin exito
        })
    }  

});

app.get('/api/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params; //parametro que este dentro del objeto. con un valor 

        if(isNaN(pid)){
            throw new Error (`El Id tiene que ser un número, ${pid} es invalido`)
        }

        const product = await productManager.getProductById(pid);

        if (!product){ //si no es un producto 
            throw new Error (`El producto con el id ${pid} no fue encontrado`); //mensaje de error
        }
        res.status(200).send({ 
            success: true,
            productos: product,
        })

    } catch (error){
        console.error(error);
        res.status(400).send({ 
            success:false, 
        });
    }
});

app.listen(PUERTO, (error)=>{ //escucha el puerto (si no se lo paso agarra el q encuentre disponible) y callBack
    if(error) {
        console.error(error);
    } else{console.log(`Servidor activo en localhost: ${PUERTO}`);}    
});