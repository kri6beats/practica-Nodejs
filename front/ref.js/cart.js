
const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacio = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales")
const btnReiniciar = document.getElementById("reiniciar");
function crearTarjetas() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("artes"));
    console.log(productos);
    if (productos && productos.length > 0) {
        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            const nuevaTarjeta = document.createElement("div");
            nuevaTarjeta.classList = "tarjeta-producto";
            nuevaTarjeta.innerHTML = `
        <img src="${producto.ARTE}" alt="arte">
       <h2>${producto.NOMBRE}</h2>
        <h3>${producto.precio}</h3>
        <div  id="idbutton">
        <button>+</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>- </button>
        </div>
        `
            contenedorTarjetas.appendChild(nuevaTarjeta);
            nuevaTarjeta.getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                    cuentaElement.innerText = agregarAlCarrito(producto);
                    actualizarNumeroCarrito();
                    actualizarTotales();
                });

            nuevaTarjeta.getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    restarAlCarrito(producto);
                    crearTarjetas();
                    actualizarNumeroCarrito();
                    actualizarTotales()

                });


        }

    }
}

crearTarjetas();
actualizarTotales();
mensajeCarritoVacio();

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("artes"));
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;

}

function mensajeCarritoVacio() {
    const productos = JSON.parse(localStorage.getItem("artes"));
    carritoVacio.classList.toggle("esconder", productos && productos.length > 0);
    totalesElement.classList.toggle("esconder", !(productos && productos.length > 0));
}

btnReiniciar.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
    localStorage.removeItem("artes");
    actualizarTotales();
    crearTarjetas();
    mensajeCarritoVacio();
    actualizarNumeroCarrito();
}

mensajeCarritoVacio();

document.getElementById("comprar").addEventListener("click", async () => {
    const res = await comprarCarrito();

    if (res) {
        reiniciarCarrito();
        window.location.href = "http://127.0.0.1:5500/compraexitosa.html";
    }
})