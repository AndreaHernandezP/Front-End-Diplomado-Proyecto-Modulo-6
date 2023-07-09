const style = `<style> 
  
 .box-product{ /*Si no se usa flex, las filas de la descripción no son del mismo tamaño en la fila*/
 display: flex;
 flex-direction: column;
 flex-wrap: nowrap;

 background-color: #F0ECEC;
 border-radius: 1rem;

 padding: 1rem;
 gap: 1rem;
 height: 100%;
 width: 100%;

 flex-shrink: 1;
    flex-grow: 1;
    max-width: 100%;
    min-width: 0;
    

} 

.box-product-grid{
 display: grid;
 grid-template-areas: "thumbnail"; /*overlaping video and image thumbnail*/
}

.box-product video{
 grid-area: thumbnail;
 border-radius: 1rem;
 z-index: 0;
 width: 100%;
}

.box-product img{       /* Imagen no se reduce, ignora el contenedor */
 grid-area: thumbnail;
 border-radius: 1rem;
 z-index: 1;
 width: 100%;
} 

.box-product-description{

font-family: Eras;
 padding: 1rem;
 border-radius: 1rem;
 background-color: whitesmoke;
 height: 100%; /*Sin esto, los espacios son de diferente tamaño // Makes description spaces equal on the row*/

 flex-shrink: 1;
 flex-grow: 1;
 max-width: 100%;
 min-width: 0;
}

</style>`;

class productBox_noIMG extends HTMLElement{
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
                            <div class="box-product">
                        
                        <div class="box-product-description">${newAttr}<br>${this.description}</div>
                        </div>`;
                break;
            case 'description':
                this.innerHTML = `${style}
                            <div class="box-product">
                        
                        <div class="box-product-description">${this.title}<br>${newAttr}</div>
                        </div>`;
                break;
        }
    }

    connectedCallback(){
        this.innerHTML = `${style}
                            <div class="box-product">
                        <div class="box-product-description">${this.title}<br>${this.description}</div>
                        </div>`;

/*
        //Video transition
        let boxProduct = document.getElementsByClassName("box-product");

        let numeroProductos = 2; //Número de productos cargados .childElementCount

        for(let i=0; i < numeroProductos;i++){
            boxProduct[i].addEventListener('mouseover', playVideo);
            boxProduct[i].addEventListener('mouseout', pauseVideo);
        }

        async function playVideo() {
            fadeOut(this.querySelector('img'));   //Children image cover
            try {
            await this.querySelector('video').play(); //Children video
        } catch(err) {
            console.log(err);
            //fadeIn img? 
        }   
        }

        function pauseVideo(){
        this.querySelector('video').pause(); //Children video
            console.log('paused');
            fadeIn(this.querySelector('img')); //Children image cover
        }

        function fadeIn(element){
            //element.style.opacity = 1; //Opacity without gradient
            element.animate( //Opacity 1 with gradient
            {opacity: "1"},
            {
                duration:200,
                fill:"forwards", //Stays on the last state of animation
            }
            )
        }

        function fadeOut(element){
            //element.style.opacity = 0; //Opacity without gradient
            element.animate( ///Opacity 0 with gradient
            {opacity: "0"},
            {
                duration:200,
                fill:"forwards", //Stays on the last state of animation
            }
            )
        }*/
        
        
    }

    
    

}

export default productBox_noIMG;