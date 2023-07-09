import navBar from "./Components/Nav/Nav_bar.js";
import footer from "./Components/Footer/Footer.js";
import productBox from "./Components/ProductBox/Product_box.js";
import productBox_noIMG from "./Components/ProductBox_noIMG/Product_box_noIMG.js";
import commentsBox from "./Components/Caja_Post_Comments/Caja_Post_Comments.js";
import { fetchData } from "./Client_Service/clientService.js";


window.customElements.define('nav-bar', navBar);
window.customElements.define('footer-custom', footer);
window.customElements.define('product-box', productBox);
window.customElements.define('box-noimg', productBox_noIMG);
window.customElements.define('comments-box', commentsBox);


    
     
