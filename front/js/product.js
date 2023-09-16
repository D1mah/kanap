import { strNoAccent } from "./format.js";
import { saveCart, getCart, deleteCart } from "./localstorage.js";

// ------------ Fetching system from API to get products.
// ------------ Récupération des produits depuis l'API
const reponse= await fetch('http://localhost:3000/api/products/');
const products= await reponse.json();


// ------------ Fetching  system to get item from name in URL
// ------------ Récupération du produit par recherche du nom dans l'URL

function findByName(){
    const urlObj= new URL(window.location.href);
    const preName= urlObj.searchParams.get("name").replace("."," ");
  for (let i=0; i<products.length; i++){
      const article=products[i];
      if (preName===strNoAccent(article.name.toLowerCase())){        
        return article;
      }
    }
  }

  const item= findByName();

// ------------ fonction générant la page produit en fonction de l'item
// ------------ Specific product generating function
  function generateProductPage(item){
    
    // Product element in product.html statement.
    // Récupération de l'élément du DOM qui accueillera le produit
    const sectionItem= document.querySelector(".item");
    
    // Tags creation and filling 
    // Création et remplisage des balises 
    const imgSection= document.querySelector(".item__img");
    const imgItem= document.createElement("img");
    imgItem.src=item.imageUrl;
    imgItem.alt=item.altTxt;
    imgSection.appendChild(imgItem);
    const titleItem= document.querySelector("#title");
    titleItem.innerText=item.name;
    const priceItem= document.querySelector("#price");
    priceItem.innerText=item.price;
    const descriptionItem= document.querySelector("#description");
    descriptionItem.innerText=item.description;
    
    // Color form options
    // Création des options du formulaire de choix de couleur
    const colorsItem= document.querySelector("#colors");
    // document.getElementById("colors").required;
    for (let i=0; i<item.colors.length;i++){ 
      const color=item.colors[i];
      const colorValue= document.createElement("option");
      colorValue.value=color;
      colorValue.innerText=color;
      colorsItem.appendChild(colorValue);
    }
    
  }
  
  generateProductPage(item);

// ----------- Cart handling
// ----------- Gestion du panier

    // Event for saving items into the cart
    // Event lié à l'enregistrement du formulaire et l'envoi au panier

const boutonAddToCart= document.querySelector("#addToCart");
boutonAddToCart.addEventListener('click', function() {
    
let product= {
    id: item._id,
    name:item.name,
    qty:parseInt(document.querySelector("#quantity").value,10),
    color:document.getElementById("colors").value
  };

//   deleteCart();

  let cart=getCart();  
  console.log(cart);
  
  let oldProduct = cart.find(i => i.name === product.name && i.color === product.color);
  if (oldProduct) {
    oldProduct.qty += product.qty;
  } else {
    cart.push(product);
  }

  saveCart(cart);
   console.log(localStorage);
});
