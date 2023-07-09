
const roomsData = () => {
    return fetch('/rooms-data').then((response)=>{
       return response.json()
   });
}

/* const carritoData = () => {
   return fetch('/carrito-data').then((response)=>{
      return response.json()
  });
}

const carritoNuevo = (productAdded) => {
   return fetch('/carrito-data2', {
       method: 'POST',
       headers: {
           "Content-Type": "application/json" },
       body: JSON.stringify(productAdded)
   }).then((response)=>{
       return response.json()});
} */

export const fetchData = {
    roomsData,
   /* carritoData,
   carritoNuevo */
}