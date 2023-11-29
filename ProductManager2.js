import fs from 'fs';

class ProductManager {
    #filePath;
    #lastId = 0;

    constructor (filePath = './product.json') {
        this.#filePath = filePath;
        this.#setLastId(); //tomo info del json y la guardo para no arrancar siempre en 0
    }

    async addProduct(title, description, price, thumbnail,  code, stock =[] ){
        try {
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
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock, 
                id: ++this.#lastId,
            };
        
            products.push(newProduct); //agrega nuevo producto como objeto
    
            await this.#saveProducts(products);//guarda la lista en json

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
        const product = products.find((product) => product.id === id)//si el id coincide con el id
        if (!product) {
            console.error("Not Found");
         }
        return product;
        }
        catch
        (error){
            console.log(error.title, error.message)
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
    
    async updateProduct(id,productToUpdate, newValue){//actualizaciones
        try {
            const products = await this.getProduct();
            //encuenra el lugar de un producto q coincida el id
            const productPlace = products.findIndex((product)=>product.id ===id);
            
            if(productPlace <= 0 ){ //si no existe, error
                throw new Error (`El producto con el id ${id}, no existe`);
            }
            //si existe, accedo a la ubi del obj y al nombre y le asigno el nuevo valor
            products [productPlace][productToUpdate] = newValue;

            await this.#saveProducts(products);
        }
        catch
        (error){
            console.log(error.title, error.message)
        };
    };

   async #setLastId(){
        try{
            const products = await this.getProduct();
            if(products.length <1 ) {
                this.#lastId = 0;
            return;
            }
            this.#lastId = products[products.length-1].id; 
            //da el ultimo articulo q agregue sin importar su numero d id
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

const productManager = new ProductManager();
//sin await trae la promesa sin resolver
console.log (await productManager.getProduct()); //trae array sin nada

await productManager.addProduct("Caja Pan Dulce", "caja para pan dulce de 500grs.", 350, "sin imagen", "cajaPanDulce", 500);
console.log (await productManager.getProduct()) //trae con caja pan dulce

await productManager.addProduct("Caja Budín", "caja para Budín de 300grs.", 250, "sin imagen", "cajaBudin", 400);

await productManager.addProduct("Caja Navideña", "caja para regalo empresarial", 50, "sin imagen", "cajaNavidad", 1000);
console.log(await productManager.getProductById(3));//muestra caja navideña

console.log(await productManager.getProduct())// muestra caja pan dulce, budin y navideña

await productManager.deleteProductById(1);

console.log(await productManager.getProduct())// muestra sin caja pan dulce (caja budin y navideña)

console.log(await productManager.getProductById(13));//muestra not found

await productManager.addProduct("Caja vino", "caja para una botella", 150, "sin imagen", "cajaBudin", 410);
await productManager.addProduct("Caja Navideña", "caja para regalo empresarial chica", 100, "sin imagen", "cajaNavidadChica", 500);
console.log (await productManager.getProduct())//trae errores de code y title repetido + caja budin y navideña(pan dulce se elimino)

await productManager.updateProduct(4, "code", "cajaVino");
await productManager.updateProduct(5, "title", "Caja Navideña Chica");
console.log (await productManager.getProduct())//deberia traer todo sin errores pero no anda :'(

