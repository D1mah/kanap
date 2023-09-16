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
    for (let i=0; i<item.colors.length;i++){ 
      const color=item.colors[i];
      const colorValue= document.createElement("option");
      colorValue.value=color;
      colorValue.innerText=color;
      colorsItem.appendChild(colorValue);
    }
    
  }
  
  generateProductPage(item);
