console.log("Hola");

const boton = document.getElementById("boton");

boton.addEventListener("submit", (e) =>{
    e.preventDefault();
    console.log("Funciona");
});