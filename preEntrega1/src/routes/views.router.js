import { Router } from "express";
import ProductManager from "../classes/productManager.js";


const router = Router();
const productManager = new ProductManager()

router.get('/products', async (req, res)=>{
    const products = await productManager.getProducts()
    res.render("products", {
        title: "Listado de productos",
        products: products,
    style:"css/products.css"});
});

router.get('/realtime', async (req, res)=>{
    const products = await productManager.getProducts()
    res.render("realtime", {
        title: "Productos en tiempo real",
        products: products,
    style:"css/products.css"});
});


export default router