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
           
            const {products} = cart;
            const productPlace = products.findIndex(product => product.product === pid);

        if (productPlace === -1 ){ //si no existe, lo agrega
            products.push({
                product: pid,
                quantity: 1
            })
        } else { products[productPlace].quantity++}
         //si existe le suma 1

        await this.updateCart(cid, {products});
        
        await this.#saveCarts(cart)

        return cart;
        }catch
        (error){
            console.log(error)
            throw error;
        };
    }

    async updateCart(cart){//actualizaciones
        try {
            const {id}=cart;
            const carts = await this.getCart();
            const cartPlace = carts.findIndex(cart => cart.id === id);
            
            carts.splice(cartPlace, 1, cart);

            await this.#saveCarts(carts);
            return carts
        }
        catch
        (error){
            console.log(error.title, error.message)
        };
    };
   
    

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
