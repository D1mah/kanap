// Fetching system from API to get products.
// Récupération des produits depuis l'API
const reponse= await fetch('http://localhost:3000/api/products/');
const products= await reponse.json();


// product section in index.html statement.
// Déclaration de la section produit index.html 
    const sectionItems = document.querySelector(".items");

