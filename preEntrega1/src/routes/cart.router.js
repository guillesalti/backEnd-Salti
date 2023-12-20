import {Router} from "express";
import CartManager from "../classes/cartManager.js";

const router =Router ();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
    try{
        let cart = await cartManager.getCarts();
        res.status(200).send({ 
            success: true,
            carrito: cart,
        })
    }catch (error){
        console.error(error);
        res.status(400).send({ 
            success:false,
            message: "el carrito esta vacio"                
        });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        res.status(200).send({ 
            success: true,
            carrito: cart,
        })

    } catch (error){
        console.error(error);
        res.status(400).send({ 
            success:false, 
            message:"no existe el id solicitado"               
        });
    }
})

router.post ("/", async (req, res) => {
    try{
        const cart = await cartManager.addCart();

        res.status(200).send({ 
            success: true,
            carrito: cart,
        })
    
    }catch (error) {
            console.error(error);
            res.status(500).send({
            success: false,
            message: `Error al modificar el carrito`,
            });
        }
})

router.post ("/:cid/products/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    try{
       const cart = await cartManager.addProductToCart(cid, pid);
       
       res.status(200).send({ 
        success: true,
        carrito: cart,
    })
    }catch (error) {
        console.error(error);
        res.status(500).send({
        success: false,
        message: `Error al agregar`,
        });
    }
})

export default router;