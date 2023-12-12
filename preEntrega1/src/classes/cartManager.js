import fs from 'fs';
import crypto from "crypto";


export default class CartManager { //exporto para usarla dentro de app
    
    #filePath;
    constructor (filePath = './src/cart.json') {
    this.#filePath = filePath;        
    }

    async addCart(){
        try {
        const carts = await this.getCart();
        const id = crypto.randomUUID()

        const newCart = {
            id,
            products: []
        }

        carts.push(newCart);

        await this.#saveCarts(carts)
        
        return newCart

        } catch (error){
            console.log(error.title, error.message)
        };
 
    }

    async getCart(){ //trae info
        try {
            if (fs.existsSync(this.#filePath)) {
                const carts = await fs.promises.readFile(this.#filePath, "utf-8")
                return JSON.parse(carts);
            }
            return [];
        }
        catch (error){
            console.log(error.title, error.message)
        };
    };

    async getCartById(id){
        try {
            const carts = await this.getCart();
            const cart = carts.find((cart) => cart.id == id)//si el id coincide con el id

        if (!cart) {
            throw new Error ("Not Found");
         }
        return cart;
        }
        catch (error){
            console.error(error)
        };
        
    };

    async addProductToCart (cid, pid) {
        try{
            const cart = await this.getCartById(cid); // lo busca x id
           
            if (!cart) {
                throw new Error("Cart not Found");
            }
            
            const productPlace = cart.products.findIndex((product) => product.product === pid);

            if (productPlace === -1) {//si no existe, lo agrega
                cart.products.push({
                    product: pid,
                    quantity: 1,
                });
            } else {
                cart.products[productPlace].quantity++;
                console.log("exists");
            }
         //si existe le suma 1

         const carts = await this.getCart();

            const cartsUpdated = carts.map((existingCart) => {
                if (existingCart.id == cid) { // si existe me lo retorna modificado
                return cart;
            }

            return existingCart; //sino, muestra el existente
         })
                 
         await this.#saveCarts(cartsUpdated) //guarda carritos modificados

        return cart;
        }catch
        (error){
            console.log(error)
            throw error;
        };
    }

    
   
    

    async deleteCartById(id){
        try {

            let carts = await this.getCart();
           
            carts = carts.filter((cart)=> cart.id !== id);
            this.#saveCarts (carts);
        }
        catch
        (error){
            console.log(error.title, error.message)
        };
    };

    async #saveCarts(carts){ //para no repetir siempre el pase d json. Le da Modularidad
        try {
            await fs.promises.writeFile(this.#filePath, JSON.stringify(carts))
        }
        catch (error){
            console.log(error.title, error.message)
        };
    };
}
