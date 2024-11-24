const BASE_URL = "http://localhost:3001/productos";

async function productList() {
    try {
        const response = await fetch (BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al listar productos", error)
    }
    
};


const createProduct = async (nombre,precio,imagen) =>{
    try {
        const response = await fetch(BASE_URL,{
            method: "POST",
            Headers: {
                "content-type": "apliccation/json",
            },
            body: JSON.stringify({nombre,precio,imagen})
        } );
        
        const data = await response.json();
        return data 

    } catch (error) {
        console.log("Error al conectar con la BD",error)
    }

    
}

const eliminarProducto = async (id) => {
    try {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });
    alert(`Producto con id ${id} eliminado exitosamente`)
    console.log(`Producto con id ${id} eliminado exitosamente`);
    } catch (error) {
        alert("Error en la solicitud DELETE ")
    console.error("Error en la solicitud DELETE:", error);
    }
};

export const serviceProduct = {
    productList,
    createProduct,
    eliminarProducto,
};