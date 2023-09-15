// Fetching system from API to get products.
// Récupération des produits depuis l'API
const reponse= await fetch('http://localhost:3000/api/products/');
const products= await reponse.json();


// product section in index.html statement.
// Déclaration de la section produit index.html 
    const sectionItems = document.querySelector(".items");

// formating function for URLs, replaces special characters. if I prefer name than id (accessiblity reasons) (to rework)    
//  fonction pour traiter les accents des noms pour les URL ( à améliorer)
export function strNoAccent(a) {
    var b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
        c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
        d="";
    for(var i = 0, j = a.length; i < j; i++) {
      var e = a.substr(i, 1);
      d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
    }
    return d;
  };

//  Product creation function
// Fonction de création des produits
function generateProducts(products){
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
      productLink.setAttribute("target", "blank");
      productLink.id="articleLink";

// unique tag for one product creation
// Création d’une balise dédiée à un produit
  const productElement = document.createElement("article");

// tags creation
// Création des balises 
  const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      imageElement.alt= article.altTxt;
  const nameElement= document.createElement("h3");
  nameElement.innerText=article.name;
  const descriptionElement= document.createElement("p");
  descriptionElement.innerText=article.description;
  


}
}


generateProducts(products);