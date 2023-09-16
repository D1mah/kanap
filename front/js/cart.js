import { saveCart, getCart, deleteCart } from "./localstorage.js";

// ------------ Fetching system from API to get products.
// ------------ Récupération des produits depuis l'API
const reponse= await fetch('http://localhost:3000/api/products/');
const products= await reponse.json();


// getting Cart
// récupérer le pannier
let cart= getCart();


// ------------ fonction générant la page panier 
// ------------ Specific cart generating function

function generateCartPage(cart){
    // cart element statement
    // Récupération de l'élément du DOM qui accueillera le produit
    const cartSection= document.querySelector("#cart__items");
    
    if (cart===null){
        alert ("Votre panier est vide");
    }
    else{
        for (let i =0; i<cart.length; i++){
            const item=cart[i];
        
        // // Récupération de l'élément du DOM qui accueillera le produit
        // const cartSection= document.querySelector("#cart__items"); 
    
    //article tag creation for each item from cart 
    // Création d'une balise article pour chaque item du panier
            const itemElement= document.createElement("article");
                itemElement.className="cart__item";
                itemElement.dataset.id=item.id;
                itemElement.dataset.color=  item.color;
    
    // Tags creation and filling 
    // Création et remplisage des balises 
            // img tag
            // balise image
            const imageSection=document.createElement("div");
                imageSection.className="cart__item__img";
                    const imageElement= document.createElement("img");
                        imageElement.src=products.find(i => i.name === item.name).imageUrl;
                        imageElement.alt=products.find(i => i.name === item.name).altTxt;
    
            
            // content tag
            // balise contenu
            const contentSection= document.createElement("div");
                contentSection.className="cart__item__content";
                    // item description tags
                    // balises de description de l'item
                    const descriptionsElement= document.createElement("div");
                        descriptionsElement.className="cart__item__content__description";
                            const nameElement= document.createElement("h2");
                                nameElement.innerText=item.name;
                            const colorElement= document.createElement("p");
                                colorElement.innerText=item.color;
                            const priceElement= document.createElement("p");
                                priceElement.innerText=`${products.find(i => i.name === item.name).price} €`;
                    
                    // tags for handleable settings (quantity and removal)
                    // balises liées aux paramètres modifiables (quantité et suppression)
                    const contentSettings=document.createElement("div");
                        contentSettings.className="cart__item__content__settings";
                            
                            // tags for quantity
                                // content tags dealing with item quantities
                                // balise contenant liée aux quantités de l'item
                            const qtySettings=document.createElement("div");
                                qtySettings.className="cart__item__content__settings__quantity";
                                    const qtyTxt= document.createElement("p"); 
                                        qtyTxt.innerText=`Qté: `;
                                // input tags to modify quantities
                                // balise Input de modification des quantités
                                const qtyChanging= document.createElement("input");
                                    qtyChanging.className="itemQuantity";
                                    qtyChanging.type="Number";
                                    qtyChanging.name="itemQuantity";
                                    qtyChanging.min="1";
                                    qtyChanging.max="100";
                                    qtyChanging.value=item.qty;

                            // tags for removal
                                // balise de suppression liée à l'item 
                            const deleteSettings=document.createElement("div");
                                deleteSettings.className="cart__item__content__settings__delete";
                                    const deleteElement=document.createElement("p");
                                        deleteElement.className="deleteItem";
                                        deleteElement.innerText="Supprimer";
    
    // Tags attachement
    // Rattachement des différentes balises au DOM
     cartSection.appendChild(itemElement);
     itemElement.appendChild(imageSection);
         imageSection.appendChild(imageElement);
     itemElement.appendChild(contentSection);
         contentSection.appendChild(descriptionsElement);
             descriptionsElement.appendChild(nameElement);
             descriptionsElement.appendChild(colorElement);
             descriptionsElement.appendChild(priceElement);
         contentSection.appendChild(contentSettings);
             contentSettings.appendChild(qtySettings);
                 qtySettings.appendChild(qtyTxt);
                 qtySettings.appendChild(qtyChanging);
             contentSection.appendChild(deleteSettings);
                 deleteSettings.appendChild(deleteElement);    
        }
        
    }}

generateCartPage(cart);
// console.log(cart);