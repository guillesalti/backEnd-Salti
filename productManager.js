class Product {
    static countProducts = 0;
    constructor(title, description, price, thumbnail, code, stock) {
        this.title=title;
        this.description=description;
        this.price=price;
        this.thumbnail=thumbnail;
        this.code=code;
        this.stock=stock;
        this.id = ++Product.countProducts;
    }
}

class productManager {
    constructor () {
        this.products = []
    }     

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.some(product => product.code === code)) {
            console.error("El código del product: ", title,", está repetido y es incorrecto: ", code);
        return null
        }
        const newProduct = new Product(title, description, price, thumbnail, code, stock);
        this.products.push(newProduct);
        return newProduct.id;
    }

    getProducts = () => {
        return this.products;
    } 

    getProductById (id)  {
        const idProduct = this.products.find(product=> product.id === id)
        if(!idProduct) {
            console.error("Not Found")
            return null;
        }  else {return console.log("El producto solicitado es: ", idProduct.title) };        
    }
}

const ProductManager = new productManager();
const product1 = ProductManager.addProduct("Caja Pan Dulce", "caja para pan dulce de 500grs.", 350, "sin imagen", "cajaPanDulce", 500);
const product2 = ProductManager.addProduct("Caja Budín", "caja para Budín de 300grs.", 250, "sin imagen", "cajaBudin", 400);
//error de code repetido
const product3 = ProductManager.addProduct("Caja Navideña", "caja para regalo empresarial", 50, "sin imagen", "cajaBudin", 1000);

console.log(ProductManager.getProducts());
console.log(ProductManager.getProductById(1));
// //id not found
console.log(ProductManager.getProductById(10));

 

