import { serviceProduct } from "../services/product-service.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const id = document.querySelector("[data-id]");



function createCard({nombre,precio,imagen,id}){
    
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML= `
        <div class="card-container--info">
                    <img class="img-producto" src="${imagen}" alt="imagen producto">
                    <div class="card-container--info ">
                        <p>${nombre}</p>
                        <div class="card-container--value valor_borrar">
                            <p>$ ${precio}</p>
                            <button class="delete-button" data-id="${id}">
                                <img src="../../img/borrar.png" alt="Eliminar" class="eliminar">
                            </button>
                        </div>
                    </div>
        </div>
    `;

    asignarEventoEliminar(card,id);
    return card;

}

function asignarEventoEliminar(card, id) {
    const botonEliminar = card.querySelector(".delete-button");
    botonEliminar.addEventListener("click", async () => {
    try {
        await serviceProduct.eliminarProducto(id);
        card.remove();
        console.log(`Producto con id ${id} eliminado`);
    } catch (error) {
        console.error(`Error al eliminar el producto con id ${id}:`, error);
    }
    });
}



const renderProducts = async () => {
    try {
        const listProducts = await serviceProduct.productList();
        listProducts.forEach((product) => {
        const productCard = createCard(product);
        productContainer.appendChild(productCard);
    });
    } catch (error) {
        console.log(error)
    }
};

form.addEventListener("submit",async(Event) =>{
    Event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    try {
        const  newProduct = await serviceProduct.createProduct(nombre,precio,imagen);
        const newcard = createCard(newProduct);
        productContainer.appendChild(newcard);
    } catch (error) {
        console.log(error)
    }



}); 

renderProducts();