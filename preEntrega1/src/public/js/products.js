// const socket =io ();
// const addProductBtn = document.querySelector("#addProductBtn");
// const deleteProductBtn = document.querySelector("#deleteProductBtn");

// addProductBtn.addEventListener("click", ()=> { //escucha los clicks
    
//     const title = document.querySelector('#title').value;
//     const description = document.querySelector('#description').value;
//     const price= document.querySelector('#price').value;
//     const thumbnail= document.querySelector('#thumbnail').value;
//     const code= document.querySelector('#code').value;
//     const stock= document.querySelector('#stock').value;
    
//     const product = {
//         title, description, price, thumbnail, code, stock,
//     };

//     socket.emit("addProduct", product);

//     title.value=''; // reinicia los valores
//     description.value='';
//     price.value='';
//     thumbnail.value='';
//     code.value='';
//     stock.value='';
// });

// deleteProductBtn.addEventListener('click', () => {
//     const id = document.querySelector('#productId').value;
//     socket.emit('deleteProduct', id);

//     id.value='';
//     alert(`el producto ${title}, fue elminiado`)
// });

// socket.io('updateProducts', (products) => {
//     const updateProduct = 
// })


const socket = io();
const addProductBtn = document.querySelector("#addProductBtn");
const deleteProductBtn = document.querySelector("#deleteProductBtn");

addProductBtn.addEventListener("click", () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const price = document.querySelector('#price').value;
    const thumbnail = document.querySelector('#thumbnail').value;
    const code = document.querySelector('#code').value;
    const stock = document.querySelector('#stock').value;

    const product = {
        title, description, price, thumbnail, code, stock,
    };

    // Enviar la solicitud POST al servidor
    fetch('/api/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(product),
    })
    .then(response => response.json())

    .then((newProduct) => {
        // Emitir el evento 'addProduct' al socket con el nuevo producto
        socket.emit("addProduct", newProduct);
    })
    .catch(error => console.error('Error al agregar producto:', error));

    // Limpiar los campos
    clearForm();
});

deleteProductBtn.addEventListener('click', async () => {
    const id = document.querySelector('#productId').value;

    // Enviar la solicitud DELETE al servidor
    await fetch(`/api/products/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())

    .then(() => {

        socket.emit('deleteProduct', id);
        alert(`El producto con ID ${id} fue eliminado`);
    })
    .catch(error => console.error('Error al eliminar producto:', error), alert('Error al eliminar producto'));
    

    // Limpiar el campo del ID
    clearForm();
});

socket.on('updateProducts', async (products) => {// Actualizar la lista de productos 
    updateProductsList(products);
    await fetch(`/api/products`, {
        method: 'GET',
    })
});

 // Limpiar los campos del formulario
function clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#thumbnail').value = '';
    document.querySelector('#code').value = '';
    document.querySelector('#stock').value = '';
    document.querySelector('#productId').value = '';
}
   
    