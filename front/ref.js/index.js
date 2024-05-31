

const contenedorTarjetas=document.getElementById("productos-container")
function crearTarjetas(productos){
    for(let i=0;i<productos.length;i++){
        const producto=productos[i];
        const nuevaTarjeta=document.createElement("div");
        nuevaTarjeta.classList="tarjeta-producto";
        nuevaTarjeta.innerHTML=`
        <img src="${producto.ARTE}" alt="imagen">
       <h2>${producto.NOMBRE}</h2>
        <h3>${producto.precio}</h3>

        <button id="btn-carrito">Agregar al carrito</button>
        
        `
       
       
        contenedorTarjetas.appendChild(nuevaTarjeta);
        nuevaTarjeta.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
        

        }

   }   
getArt().then(arte=>{
    crearTarjetas(arte);
})        



