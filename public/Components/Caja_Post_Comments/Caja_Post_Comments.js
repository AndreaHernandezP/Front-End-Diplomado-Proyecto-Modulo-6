const style = `<style> 


.box-comment{ /*Si no se usa flex, las filas de la descripción no son del mismo tamaño en la fila*/
display: flex;
flex-direction: column;
flex-wrap: nowrap;

background: linear-gradient(-60deg, #E0D5D5, #F0ECEC , #E0D5D5 );
background-repeat: no-repeat;
border-radius: 1rem;

padding: 2rem;
gap: 1rem;

max-width: 60%;
min-width: 0px;



width: 100%;    /*las columnas son del mismo tamaño*/
margin: 0 auto; /*centrar*/
} 

.box-comment-description{

padding: 1rem;
border-radius: 1rem;
background-color: whitesmoke;

/*Para que pueda reducirse la página al limite*/
overflow-x: scroll;     
scrollbar-width: none;      /*Firefox*/
-ms-overflow-style: none;   /*IE*/
}
/*Para que pueda reducirse la página al limite*/
.box-comment-description::-webkit-scrollbar{ /*Chrome & Safari*/
width: 0;
height: 0;
}

.hideElement{
padding: 0;
margin-top: -1rem; /*Removes the effect of the gap on the hidden items*/
/*Hide elements*/
display: grid;
grid-template-rows: 0fr;
opacity: 0;

transition: opacity 0.8s ease-in 0s, grid-template-rows 1s ease-in 0s, padding 1s ease-in 0s, margin-top 0s ease-in 1s;
}

.showElement{
padding: 1rem;
margin-top: 0;
/*Show element*/
grid-template-rows: 1fr;
opacity: 1;

transition: grid-template-rows 1s ease-in 0s, opacity 0.8s ease-in 0.2s, padding 1s ease-in 0s;
}

.hideElement-overflow{
overflow-y: hidden;
}

h6{
font-family: Tangerine;
font-size: 3rem;
color: white;
margin: 0;
padding: 0;

flex-grow: 0;
flex-shrink: 0;
}

p{
margin: 0;
padding: 0.5rem;
color: #CEB2B7;
font-family: Eras;
}

.description-title{
color: #CFC5C7;
border-bottom:solid 0.1rem #E0D5D5;
}


.comments-title{
display: flex;
flex-wrap: nowrap;
justify-content:space-between;
align-items: center;
width: 100%;


/*Para que pueda reducirse la página al limite*/
overflow-x: scroll;     
scrollbar-width: none;      /*Firefox*/
-ms-overflow-style: none;   /*IE*/
}
.comments-title::-webkit-scrollbar{ /*Chrome & Safari*/
width: 0;
height: 0;
}


.comments-title-img{
height: 0.6em; /*60% parent font*/
content: url(Arrow.svg);
color:#CFC5C7; /*#E0D5D5*/
transition: color 0.3s ease-in 0s;
}

.comments-title-img:hover{
color:#CEB2B7;
transition: color 0.3s ease-in 0s;
}

.comments-title-img-hide{
animation: 1s ease-in 0s 1 forwards img-hide;
}
.comments-title-img-show{
color:#CEB2B7;
animation: 1s ease-in 0s 1 forwards img-show;
}

@keyframes img-hide{
0%{
    transform: rotate(0deg);
}
100%{
    transform: rotate(90deg);
}
}

@keyframes img-show{
0%{
    transform: rotate(90deg);
}
100%{
    transform: rotate(0deg);
}
}

</style>`;

class commentsBox extends HTMLElement{
    constructor(){
        super();

        
    }

    get title(){        //Cuando se llame this.title dara el valor dentro de getter
        return this.getAttribute('title');
    }

    get description(){
        return this.getAttribute('description');
    }

    set title(valor){  //Cuando se le asigna un valor a la propiedad número, corre set
        //console.log('Inicio setter');
        this.setAttribute('title', valor);
        //console.log('Fin setter');
    }

    static get observedAttributes(){
        //console.log('observedAttributes');
        return ['title', 'description'];
    }
    attributeChangedCallback(attr, old, newAttr){
        //console.log('attributeChangedCallback');
        switch (attr){
            case 'title':
                this.innerHTML = `${style}
                                    <div class="box-comment">
                                    <h6 class="post-title">Post</h6>
                                    <div class="box-comment-description">
                                        <p class="description-title">
                                            ${newAttr}
                                        </p>
                                        <p class="description-content">
                                            ${this.description}
                                        </p>
                                    </div>
                                    <h6 class="comments-title">
                                        <span>Comments</span> 
                                        <svg class="comments-title-img comments-title-img-hide" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 351.34 351.34"><defs><style>.cls-1{fill:currentColor;opacity:0.8;}.cls-2{fill:#fff;}</style></defs><title>Arrow</title><circle class="cls-1" cx="175.67" cy="175.67" r="175.67"/><path class="cls-2" d="M173,240.53s91-41.56,101-106.88c0,0-63.34,67.3-101,71.26Z" transform="translate(0 0)"/><path class="cls-2" d="M173,240.16S81.92,198.59,72,133.27c0,0,63.34,67.3,101,71.26Z" transform="translate(0 0)"/></svg>
                                    </h6>
                                    
                                </div>`;
                break;
            case 'description':
                this.innerHTML = `${style}
                                    <div class="box-comment">
                                    <h6 class="post-title">Post</h6>
                                    <div class="box-comment-description">
                                        <p class="description-title">
                                            ${this.title}
                                        </p>
                                        <p class="description-content">
                                            ${newAttr}
                                        </p>
                                    </div>
                                    <h6 class="comments-title">
                                        <span>Comments</span> 
                                        <svg class="comments-title-img comments-title-img-hide" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 351.34 351.34"><defs><style>.cls-1{fill:currentColor;opacity:0.8;}.cls-2{fill:#fff;}</style></defs><title>Arrow</title><circle class="cls-1" cx="175.67" cy="175.67" r="175.67"/><path class="cls-2" d="M173,240.53s91-41.56,101-106.88c0,0-63.34,67.3-101,71.26Z" transform="translate(0 0)"/><path class="cls-2" d="M173,240.16S81.92,198.59,72,133.27c0,0,63.34,67.3,101,71.26Z" transform="translate(0 0)"/></svg>
                                    </h6>

                                </div>`;
                break;
        }
    }

    connectedCallback(){
        this.innerHTML = `${style}
                        <div class="box-comment">
                            <h6 class="post-title">Post</h6>
                            <div class="box-comment-description">
                                <p class="description-title">
                                    ${this.title}
                                </p>
                                <p class="description-content">
                                    ${this.description}
                                </p>
                            </div>
                            <h6 class="comments-title">
                                        <span>Comments</span> 
                                        <svg class="comments-title-img comments-title-img-hide" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 351.34 351.34"><defs><style>.cls-1{fill:currentColor;opacity:0.8;}.cls-2{fill:#fff;}</style></defs><title>Arrow</title><circle class="cls-1" cx="175.67" cy="175.67" r="175.67"/><path class="cls-2" d="M173,240.53s91-41.56,101-106.88c0,0-63.34,67.3-101,71.26Z" transform="translate(0 0)"/><path class="cls-2" d="M173,240.16S81.92,198.59,72,133.27c0,0,63.34,67.3,101,71.26Z" transform="translate(0 0)"/></svg>
                                    </h6>

                        </div>`;
  
    }

    

}

export default commentsBox;

        //Comments
    /*              <div class="box-comment-description hideElement">
                        <div class="hideElement-overflow"> <!-- Hide overflow -->
                        <p class="description-title">
                            odio adipisci rerum aut animi <br>
                            Nikita@garfield.biz
                        </p>
                        <p class="description-content">
                            quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione
                        </p>
                        </div>
                    </div> */