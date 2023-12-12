import fs from 'fs';
import crypto from "crypto";

export default class ProductManager { //exporto para usarla dentro de app
    
    #filePath;
    constructor (filePath = './src/product.json') {
    this.#filePath = filePath;        
    }

    async addProduct(title, description, price, thumbnail,  code, stock, category, status){
        try {
            if(
                title == undefined ||
                description == undefined ||
                price == undefined ||
                code == undefined ||
                stock == undefined            
                ) {
                throw new Error ("Todos los campos son obligatorios");
            }
            if(!title || !code){ //se fija si existe
                throw new Error("Producto inexistente")
            }

            const products = await this.getProduct();
    
            if (products.find(product => product.title === title)){ //valida si se repite
                console.error("Ya existe un producto con ese nombre:", title )
                return null;
            };
            if (products.some(product => product.code === code)) { //valida si se repite el code
                console.error("El código del product: ", title,", está repetido y es incorrecto: ", code);
            return null
            }           
    
            const newProduct = { //si no existe crea la lista
                id: crypto.randomUUID(),
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock,
                category,
                status 
            };
        
           products.push(newProduct); //agrega nuevo producto como objeto
    
            await this.#saveProducts(products);//guarda la lista en json
            return newProduct;
        } 
        catch (error){
            console.log(error.title, error.message)
        }; //meter todo en try/catch para manejar los errores porque traigo los datos d afuera
    };   
    
    async getProduct(){ //trae info de prod
        try {
            if (fs.existsSync(this.#filePath)) {
                const products = await fs.promises.readFile(this.#filePath, "utf-8")
                return JSON.parse(products);
            }
            return [];
        }
        catch (error){
            console.log(error.title, error.message)
        };
    };
    
    async getProductById(id){
        try {
            const products = await this.getProduct();
            const product = products.find((product) => product.id == id)//si el id coincide con el id

        if (!product) {
            throw new Error ("Not Found");
         }
        return product;
        }
        catch (error){
            console.error(error)
        };
        
    };
    
    async deleteProductById(id){
        try {
            let products = await this.getProduct();
            //nuevo array con los prod q los id son distintos al q quiero eliminar
            products = products.filter((product)=> product.id !== id);
            this.#saveProducts (products);
        }
        catch
        (error){
            console.log(error.title, error.message)
        };
    };
    
    async updateProduct(id, newValue){//actualizaciones
        try {
            const products = await this.getProduct();
            //encuenra el lugar de un producto q coincida el id
            const productPlace = products.findIndex(product=>product.id ===id);
            
            if(productPlace === -1 ){ //si no existe, error
                throw new Error (`El producto con el id ${id}, no existe`);
            }
            //si existe, accedo a la ubi del obj y al nombre y le asigno el nuevo valor
            products [productPlace]= {
                ...products[productPlace],
                ...newValue
            }
            await this.#saveProducts(products);
        }
        catch
        (error){
            console.log(error.title, error.message)
        };
    };


    async #saveProducts(products){ //para no repetir siempre el pase d json. Le da Modularidad
        try {
            await fs.promises.writeFile(this.#filePath, JSON.stringify(products))
        }
        catch (error){
            console.log(error.title, error.message)
        };
    };
}
// const productManager = new ProductManager();
// await productManager.addProduct(
//     "Caja Pan Dulce 250grs", 
//     "caja para pan dulce de 250grs.", 
//     450, 
//     "sin imagen",
//     "cajaPanDulce250",
//     500,
//     "cajas",
//     true
// );
// await productManager.addProduct(
//     "Caja Pan Dulce 500grs", 
//     "caja para pan dulce de 500grs.", 
//     350, 
//     "sin imagen",
//     "cajaPanDulce500",
//     500,
//     "cajas",
//     true
// ),
// await productManager.addProduct(
//     "Caja Pan Dulce 250grs", 
//     "caja para pan dulce de 250grs.", 
//      450, 
//     "sin imagen",
//      "cajaPanDulce250",
//     500,
//     "cajas",
//     true
// )
// await productManager.addProduct(
//      "Caja Budín 300grs", 
//     "caja para Budín de 300grs.", 
//     250, 
//     "sin imagen",
//     "cajaBudin300",
//      400,
//      "cajas",
//     true
// )
// await productManager.addProduct(
//     "Caja Budín 500grs", 
//       "caja para Budín de 500grs.", 
//     350, 
//     "sin imagen",
//     "cajaBudin500",
//     400,
//     "cajas",
//     true
// )
// await productManager.addProduct(
//     "Caja Navideña Grande",  
//     "caja para regalo empresarial",
//     800, 
//     "sin imagen",
//     "cajaNavideñaGrande",
//      1100,
//      "cajas",
//     true
// )
// await productManager.addProduct(
//     "Caja Navideña Chica",  
//     "caja para regalo empresarial",
//     600, 
//     "sin imagen",
//     "cajaNavideñaChica",
//     1100,
//     "cajas",
//     true
// )
// await productManager.addProduct(
//     "Caja para una botella",  
//     "caja para una botella",
//     150, 
//     "sin imagen",
//     "cajaUnaBotella",
//     410,
//     "cajas",
//     true
// )
// await productManager.addProduct(
//     "Caja para dos botellas",  
//     "caja para dos botella",
//     150, 
//     "sin imagen",
//     "cajaDosBotella",
//     410,
//     "cajas",
//     true
// )
// console.log (await productManager.getProduct()) 
