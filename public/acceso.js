const barraBusqueda = document.querySelector('form');
const input = document.getElementsByTagName('input');
const button = document.getElementById('button'); //Una etiqueta botón recarga la página, input type button no recarga la página, 

const templateDatos = document.getElementById('templateDatos');

const contenedorGeneral = document.getElementById('contenedorGeneral');
const templateError = document.getElementById('templateError');
const form = document.querySelector('form');


let mainContainer = document.querySelector('.main-container');
let container = document.querySelector('.main-box-content');

//barraBusqueda.addEventListener('submit',function(){datosClima()}); //Evento click o submit***
button.addEventListener('click',function(){datosAPI()}); //Evento click o submit***

function datosAPI(){
    let user = input[0].value;   //API se encuentra en inglés
    let password = input[1].value;

    var obj = {
        user: input[0].value,
        password: input[1].value
    }

     fetch('/acceso', { //Manda la ciudad a la ruta /weather
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(obj)
    }).then((response) => {     //reacciona a la respuesta del servidor
            response.json().then((data) => {    //Se recibe la data respondida del Backend que dentro tiene la propiedad "data" (o el nombre dado ej:"dataWeather") y a su vez dentro las propiedades de interés
                    console.log(data);
                    
                    //If property error in dataAcess exists
                  if(data.dataAccess.hasOwnProperty('error') || data.dataAccess == false){     //Si hay error    
                    console.log("Error desde el Frontend: ");
                    console.log(data.dataAccess.error);

                    if(document.getElementById('mensajeError') == null){    //Checa si no existe un mensaje de error para crear uno y no se empalmen muchos
                        let templateClone = document.importNode(templateError.content, true);   //Copia el contenido del template
                        contenedorGeneral.insertBefore(templateClone, form);    //Añade el mensaje de error
                    }
                    
                    let mensajeError = document.getElementById('mensajeError'); //Si ya existia, se sobreescribe, si no existia se crea
                        if(data.dataAccess == false){
                            mensajeError.innerHTML = 'Invalid entry, try again';
                        }
                        else if(data.dataAccess.error.code == 105){
                            console.log('Lost connection with the server, try again later');
                            mensajeError.innerHTML = 'Lost connection with the server, try again later';
                        } else if(data.dataAccess.error.code == 601){
                            console.log('Input is empty');
                            mensajeError.innerHTML = 'Input is empty';
                        } else if(data.dataAccess.error.code == 615){
                            console.log('Request failed, try again');
                            mensajeError.innerHTML = 'Request failed, try again';
                        } else if(data.dataAccess.error.code == 104){
                            console.log('Usage limit reached');
                            mensajeError.innerHTML = 'Usage limit has been reached';
                        }  

                }else{  //Sin error
                    console.log("Exito desde el Frontend: ");
                    //console.log(data);
                   
                    /* console.log(data.dataAccess);
                    console.log(data.users[0].name);
                    console.log(data.users[0].username);
                    console.log(data.users[0].email);
                    console.log(data.users[0].address.city);
                    console.log(data.users[0].phone);

                    console.log(data.comments[0].post);
                    console.log(data.comments[0].id);
                    console.log(data.comments[0].name);
                    console.log(data.comments[0].email);
                    console.log(data.comments[0].body); */

                    //console.log(data.users.length);
                      
                    if(document.getElementById('mensajeError')){    //Si hay mensaje de error, lo elimina
                        let mensajeError = document.getElementById('mensajeError');
                        contenedorGeneral.removeChild(mensajeError);
                    }
                    
                    //Hide Access panel
                    let accessPanel = document.querySelector('#contenedorGeneral');
                    accessPanel.style.display = 'none';

                    //Add Users
                     let users = document.getElementsByTagName('box-noimg'); //Users-list element created
                    for(let i=0; i < data.users.length; i++){
                        container.appendChild(document.createElement('box-noimg')); //Adding a user-box

                        let name = data.users[i].name;
                        let username = data.users[i].username;
                        let email = data.users[i].email;
                        let city = data.users[i].address.city;
                        let phone = data.users[i].phone;

                        const description = `<div class="room-description">
                                                <p>Datos:</p> 
                                                <ul>
                                                    <li>Usuario: ${username}</li>
                                                    <li>Email: ${email}</li>
                                                    <li>City: ${city}</li>
                                                    <li>Phone: ${phone}</li>
                                                </ul>
                                            </div>`;

                        users[i].setAttribute("title", `<div class="room-title">${name}</div>`);      //Changing title
                        users[i].setAttribute("description", description);                //Changing description
                        //console.log( products[i]);
                    }
                    
                    //Add a comment container
                    let commentsContainer = document.createElement('div');
                    commentsContainer.classList.add('main-box-comments');
                    mainContainer.appendChild(commentsContainer);

                    //Add 3 Posts
                    let post = document.getElementsByTagName('comments-box'); //Post-list element created
                    for(let i=0; i < 3; i++){
                        commentsContainer.appendChild(document.createElement('comments-box')); //Adding a user-box

                        post[i].setAttribute("title", `<div class="room-title"> </div>`);      //Changing title
                        post[i].setAttribute("description", 'Post number ' + (i+1)); 

                        let boxComment = post[i].querySelector('.box-comment');


                        let comments = data.comments.filter(element => element.postId == (i+1));
                        //Add comments for this post
                        for(let j=0; j < comments.length; j++){
                            let name = comments[j].name;
                            let email = comments[j].email;
                            let body = comments[j].body;

                            //Add template comment
                            boxCommentDescription = document.createElement('div');
                            boxCommentDescription.classList.add('box-comment-description');
                            boxCommentDescription.innerHTML = `<p class="description-title">
                                                                    ${name}<br>${email}
                                                                </p>
                                                                <p class="description-content">
                                                                    ${body}
                                                                </p>`

                            boxComment.appendChild(boxCommentDescription);
                        }

                        //console.log( products[i]);
                    }
                } 
            })
        }).then((response) => console.log("Desde el Frontend: Respuesta del Backend recibida"));// Confirmacion del servidor
 
}

 /* //comments-box
                    document.querySelector('.contenedorGeneral').display='none'; //ocultar los inputs
                    main-box-content - generar usuarios */

