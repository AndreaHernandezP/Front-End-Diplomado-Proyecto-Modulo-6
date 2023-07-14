const barraBusqueda = document.querySelector('form');
const input = document.querySelector('input');
const button = document.getElementById('button'); //Una etiqueta botón recarga la página, input type button no recarga la página, 

const templateDatos = document.getElementById('templateDatos');

const contenedorGeneral = document.getElementById('contenedorGeneral');
const templateError = document.getElementById('templateError');
const form = document.querySelector('form');

let container = document.querySelector('.main-box-content');

//barraBusqueda.addEventListener('submit',function(){datosClima()}); //Evento click o submit***
button.addEventListener('click',function(){datosAPI()}); //Evento click o submit***

function datosAPI(){
    let bebida = input.value;   //API se encuentra en inglés

    var obj = {
        bebida: input.value
    }

    fetch('/bebidas', { //Manda la ciudad a la ruta /weather
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(obj)
    }).then((response) => {     //reacciona a la respuesta del servidor
            response.json().then((data) => {    //Se recibe la data respondida del Backend que dentro tiene la propiedad "data" (o el nombre dado ej:"dataWeather") y a su vez dentro las propiedades de interés
                if(data.dataDrinks.drinks == null || data.dataDrinks.error){     //Si hay error    
                    console.log("Error desde el Frontend: ");
                    console.log(data.dataDrinks.error);

                    if(document.getElementById('mensajeError') == null){    //Checa si no existe un mensaje de error para crear uno y no se empalmen muchos
                        let templateClone = document.importNode(templateError.content, true);   //Copia el contenido del template
                        contenedorGeneral.insertBefore(templateClone, form);    //Añade el mensaje de error
                    }
                    
                    let mensajeError = document.getElementById('mensajeError'); //Si ya existia, se sobreescribe, si no existia se crea
                        if(data.dataDrinks.error.code == 105){
                            console.log('Lost connection with the server, try again later');
                            mensajeError.innerHTML = 'Lost connection with the server, try again later';
                        } else if(data.dataDrinks.error.code == 601){
                            console.log('Input is empty');
                            mensajeError.innerHTML = 'Input is empty';
                        } else if(data.dataDrinks.error.code == 615){
                            console.log('Request failed, try again');
                            mensajeError.innerHTML = 'Request failed, try again';
                        } else if(data.dataDrinks.error.code == 104){
                            console.log('Usage limit reached');
                            mensajeError.innerHTML = 'Usage limit has been reached';
                        }

                }else{  //Sin error
                    console.log("Exito desde el Frontend: ");
                    //console.log(data.dataDrinks);
                    console.log(data.dataDrinks.drinks[0]);
                    //console.log(data);
                   
                    console.log(data.dataDrinks.drinks[0].strDrink);
                    console.log(data.dataDrinks.drinks[0].strCategory );
                    console.log(data.dataDrinks.drinks[0].strAlcoholic );
                    console.log(data.dataDrinks.drinks[0].strIngredient1);
                    console.log(data.dataDrinks.drinks[0].strDrinkThumb );

                    //console.log(data.dataDrinks.drinks.length);
                    
                    

                 
                    //console.log("Datos de interés: "+ data.dataDrinks.location.name + data.dataDrinks.location.country + data.dataDrinks.request.query + data.dataDrinks.current.temperature + data.dataDrinks.current.weather_icons + data.dataDrinks.current.wind_speed + data.dataDrinks.current.humidity)
                    
                    if(document.getElementById('mensajeError')){    //Si hay mensaje de error, lo elimina
                        let mensajeError = document.getElementById('mensajeError');
                        contenedorGeneral.removeChild(mensajeError);
                    }
                    
                    //Limpiar la lista
                    container.innerHTML = "";
                    //console.log(data.rooms); 
                     let products = document.getElementsByTagName('product-box'); //Drink-list element created
                    for(let i=0; i < data.dataDrinks.drinks.length; i++){
                        container.appendChild(document.createElement('product-box')); //Adding a product-box
                        let name = data.dataDrinks.drinks[i].strDrink;
                        let category = data.dataDrinks.drinks[i].strCategory;
                        let alcoholic = data.dataDrinks.drinks[i].strAlcoholic;
                        //let ingredient = data.dataDrinks.drinks[i].strIngredient1;
                        let src = data.dataDrinks.drinks[i].strDrinkThumb;

                        const description = `<div class="room-description">
                                                <p>Descripción:</p> 
                                                <ul>
                                                    <li>Categoría: ${category}</li>
                                                    <li>Tipo de bebida: ${alcoholic}</li>
                                                </ul>
                                            </div>`;

                        products[i].setAttribute("title", `<div class="room-title">${name}</div>`);      //Changing title
                        products[i].setAttribute("description", description);                //Changing description
                        products[i].querySelector('img').src = src;
                        //console.log( products[i]);
                    }
 




                    
                     /* if(document.getElementById('template') == null){    //Si no existe la tabla de datos, entonces la agrega
                        contenedorGeneral.appendChild(templateDatos.content);
                        
                    }
                    //const divTemplate = document.getElementById('template');

                    //Lee los objetos de HTML
                    const ciudadBuscada = document.getElementById('ciudadBuscada');
                    const iconoClima = document.getElementById('iconoClima');
                    const temperature = document.getElementById('temperature');
                    const windSpeed = document.getElementById('windSpeed');
                    const humidity = document.getElementById('humidity');

                    //Escribe sobre los objetos de HTML
                    ciudadBuscada.innerHTML = data.dataDrinks.request.query;
                    iconoClima.src = data.dataDrinks.current.weather_icons; //'<img src="'+data.current.weather_icons+'">';

                    temperature.innerHTML = data.dataDrinks.current.temperature + ' °C';
                    windSpeed.innerHTML = data.dataDrinks.current.wind_speed + ' km/h';
                    humidity.innerHTML = data.dataDrinks.current.humidity + '%'; */
 
                }
            })
        }).then((response) => console.log("Desde el Frontend: Respuesta del Backend recibida"));// Confirmacion del servidor

}

