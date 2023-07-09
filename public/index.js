import { fetchData } from "./Client_Service/clientService.js";

//Código index.js
let container = document.querySelector('.main-box-content');

fetchData.roomsData().then((data)=>{ // GET Rooms-data list
    //console.log(data.rooms); 
    let products = document.getElementsByTagName('product-box'); //Room-list element created
    for(let i=0; i < data.rooms.length; i++){
        container.appendChild(document.createElement('product-box')); //Adding a product-box
        let number = data.rooms[i].number;
        let bed = data.rooms[i].bed;
        let guest = data.rooms[i].guest;
        let balcony = data.rooms[i].balcony;
        let src = data.rooms[i].src;
        const description = `<div class="room-description">
                                <p>Descripción:</p> 
                                <ul>
                                    <li>Cama: ${bed}</li>
                                    <li>Huéspedes: ${guest}</li>
                                    <li>Balcón: ${balcony}</li>
                                </ul>
                            </div>`;

        products[i].setAttribute("title", `<div class="room-title">${number}</div>`);      //Changing title
        products[i].setAttribute("description", description);                //Changing description
        products[i].querySelector('img').src = "/img/" + src;
        //console.log( products[i]);
    }
}); 