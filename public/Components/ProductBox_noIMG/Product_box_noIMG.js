const style = `<style>  

 .box-noimg-product{ /*Si no se usa flex, las filas de la descripción no son del mismo tamaño en la fila*/
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
   
    background-color: #F0ECEC;
    border-radius: 1rem;
   
    padding: 1rem;
    height: 100%;
    width: auto;
   
       max-width: 100%;
       min-width: 0;

       margin-bottom: -2rem;
} 

.box-noimg-product-description{
    font-family: Eras;
    padding: 1rem;

    background-color: whitesmoke;
    border-radius: 1rem;
    
    
    flex-shrink: 1;
    flex-grow: 1;
    max-width: 100%;
    min-width: 0;

    

    overflow-x: scroll;     
    scrollbar-width: none;      /*Firefox*/
    -ms-overflow-style: none;   /*IE*/
}
.box-noimg-product-description::-webkit-scrollbar{ /*Chrome & Safari*/
    width: 0;
    height: 0;
}

@media (max-width:15rem){
    .main-noimg-content{
        grid-template-columns: repeat(auto-fill, 100%); /* Hace que se llenen las columnas sin hacer overflow */
    }

    .box-noimg-product-description{
        overflow-x: scroll;
    }
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
                            <div class="box-noimg-product">
                        
                        <div class="box-noimg-product-description">${newAttr}<br>${this.description}</div>
                        </div>`;
                break;
            case 'description':
                this.innerHTML = `${style}
                            <div class="box-noimg-product">
                        
                        <div class="box-noimg-product-description">${this.title}<br>${newAttr}</div>
                        </div>`;
                break;
        }
    }

    connectedCallback(){
        this.innerHTML = `${style}
                            <div class="box-noimg-product">
                        <div class="box-noimg-product-description">${this.title}<br>${this.description}</div>
                        </div>`;
    }

    
    

}

export default productBox_noIMG;