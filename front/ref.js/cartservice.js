function agregarAlCarrito(producto){
    const memoria=JSON.parse(localStorage.getItem("artes"));
    console.log(memoria)
    let cuenta=0;
  
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("artes",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cuenta = 1;
    }
    else {
        //Si hay localstorage me fijo si el artículo ya está ahí
        const indiceProducto = memoria.findIndex(artes => artes.id === producto.idTBgaleria);
        console.log(indiceProducto);
        const nuevaMemoria = memoria;
        //Si el producto no está en el carrito lo agrego
        if(indiceProducto === -1){
          nuevaMemoria.push(getNuevoProductoParaMemoria(producto));;
          cuenta = 1;
        } else {
          //Si el producto está en el carrito le agrego 1 a la cantidad.
          nuevaMemoria[indiceProducto].cantidad ++;
          cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("artes",JSON.stringify(nuevaMemoria));
      }
      actualizarNumeroCarrito();
      return cuenta;
    }
    
   function restarAlCarrito(producto){
    const memoria=JSON.parse(localStorage.getItem("artes"));
    const indiceProducto = memoria.findIndex(artes => artes.id === producto.id)
    if(memoria[indiceProducto].cantidad===1){
      memoria.splice(indiceProducto,1);
    }
    else{
      memoria[indiceProducto].cantidad--;
      
    }
    localStorage.setItem("artes",JSON.stringify(memoria));
   }


function getNuevoProductoParaMemoria(producto){
    const nuevoProducto=producto;
    nuevoProducto.cantidad=1;
    return nuevoProducto;
}
const numeroCarrito=document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    const memoria=JSON.parse(localStorage.getItem("artes"));
    if(memoria && memoria.length>0){
       const cuenta=memoria.reduce((acum,current) =>acum+current.cantidad,0);
       numeroCarrito.innerText=cuenta;
      }
      else{
        numeroCarrito.innerText=0;
        mensajeCarritoVacio();
      }
} 
async function comprarCarrito(){
  const carrito=JSON.parse(localStorage.getItem("artes"));
  if(carrito && carrito.length>0){
      const res=await fetch("http://localhost:4000/carrito/comprar",{
          method:"POST",
          body:JSON.stringify(carrito),
          headers:{
              "Content-Type":"application/json"
          }
      })
      return res.ok;
      }
      return false;
  }

actualizarNumeroCarrito();
