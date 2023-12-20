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
    .catch(error => console.error('Error al agregar producto:', error));

    // Limpiar los campos
    clearForm();
});



deleteProductBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = document.querySelector("#productId").value;
    try{
    // Enviar la solicitud DELETE al servidor
    const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
        await response.json();
        alert(`El producto con ID ${id} fue eliminado`);

    } catch (error) {
        // Capturar errores y mostrar el alert de error
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto");
    }

    // Limpiar el campo del ID
    clearForm();
});

socket.on("updateProducts", async (products) => {
    // Actualizar la lista de productos
    updateProductsList(products);
    await fetch(`/api/products`, {
        method: "GET",
    });
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

socket.on('updateProducts', (data)=>{
    console.log(data)
})

const listGroup = document.querySelector(".listGroup");
const updateList = (list) =>{
    listGroup.innerHTML =''
    list.forEach(prod => {
        const product = document.createElement ('div');
        product.setAttribute('style', 'width: 18rem;');
        product.setAttribute('class', 'newCard');
        product.innerHTML= `
        <div class="cardProduct">
            <div class="imgCardProduct">
                <img src="${prod.thumbnail}" alt="{{this.name}}" />
            </div>
            <div class="infoCardProduct">
                <h3 class="titleCardProduct">${prod.title}</h3>
                <p class="descriptionCardProduct">${prod.description}</p>
                <p class="priceCardProduct">${prod.price}</p>
                <p class="stockCardProduct">${prod.stock}</p>
                <p class="codeCardProduct">${prod.code}</p>
                <p>${prod.id}</p>
            </div>
            < a href='#' class='btn'>Añadir al carrito</a>
        </div>
    `;
    listGroup.appendChild(product)
    });
    
}


 
   

    