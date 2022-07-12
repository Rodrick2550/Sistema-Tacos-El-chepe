console.log("Hola");

const boton = document.getElementById("newProduct");

boton.addEventListener("click", (e) =>{
    e.preventDefault();
    console.log("Funciona");
});