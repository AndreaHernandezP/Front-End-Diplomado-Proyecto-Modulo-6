const html = `<div id="navigate-bar-box">
<a class="logo-ref" href="/">
  <img class="logo" src="Logo.svg">
</a>
<div class="menu">
<a href="/clima">Clima</a>
<a href="/bebidas">Bebidas</a>
<a href="/acceso">Acceso</a>
</div>
</div> 
<div class="border-nav"></div>`;

const style = `<style> 
  
#navigate-bar-box {
  display: grid;
  grid-template: ". logo menu" 3rem/1fr max-content 1fr;
  background-color: white;
  justify-content: center;
  
}

.logo-ref{
  grid-area: logo;
}

.logo {

  /*Para que pueda reducir su tamaño y haga overflow en height*/
  min-width: 0;
  max-width: 100%;
  

  height: 5rem;
  margin: calc(5rem / -10) 0 0rem 0;
}

.menu {
  grid-area: menu;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  min-width: 0;
  flex-shrink: 1;
  padding: 0 calc(calc(0.7rem + 0.5vw) / 2) 0 0;
  margin-left: calc(calc(0.7rem + 0.5vw) / -2);
}

.menu a {
  font-size: calc(0.7rem + 0.5vw);
  font-family: sans-serif;
  color: #D5C8C9;
  text-decoration: none;
  padding: 0 calc(calc(0.7rem + 0.5vw) / 2);
  margin: 0 calc(calc(0.7rem + 0.5vw) / 2);
  min-width: 0;
  min-height: 0;
  flex-shrink: 1;

  transition: all 1s 0s;
}

a.focus { /*Focus on menu*/
  color: #D5C8C9;
  background: linear-gradient(white, white) padding-box, linear-gradient(90deg, #E3DFDF,  #D5C8C9) border-box;
  border: 1px solid transparent;
  border-radius: 0.4rem;
}

a.unfocus{ /*Unfocus on menu*/
  color: #E3DFDF;
}

.border-nav {
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(90deg, #E3DFDF, #D5C8C9, #E3DFDF);
  /*Add a bottom margin because the Logo is out of the box*/
  margin-bottom: calc(5rem - 3rem + calc(5rem / -10));
}

@media (max-width:580px){
  #navigate-bar-box {
    grid-template: ". logo ." 3rem
                  ". menu ." 3rem /1fr min-content 1fr;
  }
  .menu {
    margin-top:0.5rem;  /*El espacio que la imagen hace overflow hacia abajo*/
    margin-left: 0;
  }
}

@media (max-width:230px){
  #navigate-bar-box {
  grid-template: " logo " 3rem
                  " menu " 1fr / 1fr ;
  }
  .menu {
    flex-direction: column;

    padding: calc(calc(0.7rem + 0.5vw) / 2) 0;
  }
  .menu a {
    padding:  calc(calc(0.7rem + 0.5vw) / 4);
    margin:  calc(calc(0.7rem + 0.5vw) / 4) 0;
  }
}

</style>`;

class navBar extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `${style}${html}`;
        let logo = this.querySelector('.logo');
        logo.src= "Logo.svg";
        
    }

    connectedCallback(){
        let menu = document.querySelector('.menu');    //Returns the element

        //console.log(menu.childElementCount);
        //console.log(menu.children);

        for(let i=0; i < menu.childElementCount;i++){
            menu.children[i].addEventListener('mouseover', focus);
            menu.children[i].addEventListener('mouseout', unfocus);
        }

        function focus(){
            this.classList.add('focus');
            for(let i=0; i < this.parentElement.childElementCount;i++){ //Adding class unfocus to all siblings
                if(!this.parentElement.children[i].classList.contains('focus')){ //Exception of the one that has focus
                    this.parentElement.children[i].classList.add('unfocus');
                }
            }
        }

        function unfocus(){
            Array.from(this.parentElement.children).forEach( (element) => { //HTMLCollection to Array in order to use forEach
                element.classList.remove('focus', 'unfocus');
            }
            );
        }
    }

}

export default navBar;