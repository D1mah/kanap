import { strNoAccent } from "./format.js";

// Fetching system from API to get products.
// Récupération des produits depuis l'API
const reponse= await fetch('http://localhost:3000/api/products/');
const products= await reponse.json();



//  Products generating function
// Fonction de création des produits
function generateProducts(products){

// product section in index.html statement.
// Déclaration de la section produit index.html 
const sectionItems = document.querySelector(".items");

for (let i = 0; i < products.length; i++) {
  const article=products[i];

// ----------- DOM's element creation to expose items
// -----------  Création des éléments du DOM qui accueilleront les items  

// article links creation
// Création des liens article 
      const preLinkName= strNoAccent(article.name);
      const linkName= preLinkName.toLowerCase().replace(" ", ".");
      const productLink= document.createElement("a");
      productLink.setAttribute("href",`./product.html?name=${linkName}`);
      // productLink.setAttribute("target", "blank");
      productLink.id="articleLink";

// unique tag for one product creation
// Création d’une balise dédiée à un produit
  const productElement = document.createElement("article");

// Tags creation and filling 
// Création et remplisage des balises 
  const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      imageElement.alt= article.altTxt;
  const nameElement= document.createElement("h3");
  nameElement.innerText=article.name;
  const descriptionElement= document.createElement("p");
  descriptionElement.innerText=article.description;
  
// ----------- article link attachement to displayed products
// ----------- Rattachement du lien article aux produits affichés
    
sectionItems.appendChild(productLink);
productLink.appendChild(productElement);
productElement.appendChild(imageElement);
productElement.appendChild(nameElement);
productElement.appendChild(descriptionElement);

}
}


generateProducts(products);