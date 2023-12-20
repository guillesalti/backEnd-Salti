const socket = io();
const addProductBtn = document.querySelector("#addProductBtn");
const deleteProductBtn = document.querySelector("#deleteProductBtn");

addProductBtn.addEventListener("click", (e) => {
    e.preventDefault() 
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

    // .then((newProduct) => {
    //     // Emitir el evento 'addProduct' al socket con el nuevo producto
    //     socket.emit("addProduct", newProduct);
    // })
    .catch(error => console.error('Error al agregar producto:', error));

    // Limpiar los campos
    clearForm();
});

deleteProductBtn.addEventListener('click', async (e) => {
    e.preventDefault() 
    const id = document.querySelector('#productId').value;

    try {
       
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
        });

        // if (!response.ok) {
        //     throw new Error(`Error al eliminar producto: ${response.statusText}`);
        // }

        // Si la solicitud DELETE fue exitosa, emitir el evento y mostrar el alert
        // socket.emit('deleteProduct', id);
        alert(`El producto con ID ${id} fue eliminado`);

    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto');
    }

    // Limpiar el campo del ID
    clearForm();
});



const updateList = (list) =>{
    listGroup.innerHTML =''
    list.forEach(prod => {
        const product = document.createElement ('div');
        product.setAttribute('style', 'width: 18rem;');
        product.setAttribute('class', 'newCard');
        product.innerHTML= `
        <div class="cardProduct">
            <div class="imgCardProduct">
                <img src="{{this.thumbnail}}" alt="{{this.name}}" />
            </div>
            <div class="infoCardProduct">
                <h3 class="titleCardProduct">{{product.title}}</h3>
                <p class="descriptionCardProduct">{{product.description}}</p>
                <p class="priceCardProduct">{{product.price}}</p>
                <p class="stockCardProduct">{product{product.stock}}</p>
                <p class="codeCardProduct">{{product.code}}</p>
                <p>{{product.id}}</p>
            </div>
            < a href='#' class='btn'>Añadir al carrito</a>
        </div>
    `;
    listGroup.appendChild(product);
    });
    
}
socket.on('updateProducts', (data)=>{
    console.log(data)
})

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
   
document.addEventListener('DOMContentLoaded', () => {

    console.log('se recargó la página');
    
    });
    