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

height: 100%; /*las filas son del mismo tamaño*/

width: 100%;    /*las columnas son del mismo tamaño*/
margin: 0 auto; /*centrar*/
} 

.box-comment-description{

padding: 1rem;
border-radius: 1rem;
background-color: whitesmoke;

overflow-x: scroll;     
scrollbar-width: none;      /*Firefox*/
-ms-overflow-style: none;   /*IE*/
}
.box-comment-description::-webkit-scrollbar{ /*Chrome & Safari*/
width: 0;
height: 0;
}

h6{
font-family: Tangerine;
font-size: 3rem;
color: white;
margin: 0;
padding: 0;
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
overflow-x: scroll;     
scrollbar-width: none;      /*Firefox*/
-ms-overflow-style: none;   /*IE*/
}
.comments-title::-webkit-scrollbar{ /*Chrome & Safari*/
width: 0;
height: 0;
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
                                    <h6 class="comments-title">Comments</h6>
                                    
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
                                    <h6 class="comments-title">Comments</h6>
                                    
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
                            <h6 class="comments-title">Comments</h6>
                            
                        </div>`;
        
    }

    
    

}

export default commentsBox;

        //Comments
    /*  <div class="box-comment-description">
            <p class="description-title">
                Maria josefina Gomez morin<br>joseinamariasm@gmail.com
            </p>
            <p class="description-content">
                Description
            </p>
        </div>  */