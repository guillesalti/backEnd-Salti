import { Router } from "express";
import ProductManager from "../classes/productManager.js";

const router = Router ();
const productManager = new ProductManager();

router.get ('/', async (req, res)=> {
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
            productos: products.slice(0, +limit), //muestra los productos dentro del limit piesto
        });
    } catch (error){ //si no hay prod
        console.error(error);
        res.status(400).send({ //codigo de error, no hay exito
            success:false, //objeto sin exito
        })
    }  
});

router.get('/:pid', async (req, res) => { //obtener info
        try {
            const { pid } = req.params; //parametro que este dentro del objeto. con un valor 
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
})

router.post('/', async (req, res) => { //crea info
    try {
        const { title, description, price, thumbnail, code, stock } = req.body; // Desestructuración de req.body para obtener las variables

        const result = await productManager.addProduct(title, description, price, thumbnail, code, stock);

        res.status(200).send({
            success: true,
            message: `Producto: ${title} agregado exitosamente`,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error al agregar el producto",
        });
    }
});


router.put('/:pid', async (req, res) => { //modifica info
    const { pid } = req.params;

    try {
        let product = await productManager.getProductById(pid);
        const { title, description, price, thumbnail, code, stock } = req.body;

        if (product == null || product === undefined){ //si no es un producto 
            throw new Error (`El producto con el id ${pid} no fue encontrado`); //mensaje de error
        }
        let newProduct= {
            title: title || product.title, 
            description: description || product.description, 
            price: price || product.price, 
            thumbnail: thumbnail || product.thumbnail, 
            code: code || product.code, 
            stock: stock || product.stock, 
        }
        let result = await productManager.updateProduct(pid, newProduct)
        res.status(200).send({
            success: true,
            message: `Producto; ${pid} fue modificado exitosamente`,
            data: result,
        });
        } catch (error) {
            console.error(error);
            res.status(500).send({
            success: false,
            message: `Error al modificar el producto: ${title}`,
            });
        }
    });

router.delete('/:pid', async (req, res) => { //borrar info
    const { pid } = req.params; //parametro que este dentro del objeto. con un valor 
    try {
        let product = await productManager.getProductById(pid);

        if (!product){ //si no es un producto 
            throw new Error (`El producto con el id ${pid} no fue encontrado`); //mensaje de error
        }
        let result = await productManager.deleteProductById(pid)
        res.status(200).send({
            success: true,
            message: `Producto; ${pid} fue eliminado exitosamente`,
            data: result
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({
        success: false,
        message: `Error al eliminar el producto: ${title}`,
        });
    }
});

export default router;