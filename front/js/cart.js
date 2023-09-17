import { saveCart, getCart, deleteCart } from "./localstorage.js";

// ------------ Fetching system from API to get products.
// ------------ Récupération des produits depuis l'API
const reponse= await fetch('http://localhost:3000/api/products/');
// in cart.js, ther is a little change, produits concerns API fetching, products will be use below
const produits= await reponse.json();


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
                        imageElement.src=produits.find(i => i.name === item.name).imageUrl;
                        imageElement.alt=produits.find(i => i.name === item.name).altTxt;
    
            
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
                                priceElement.innerText=`${produits.find(i => i.name === item.name).price} €`;
                    
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
    // Rattachement des différentes balises au DO
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

// ------------ modifying settings
    // display quantity and price sum at the page loading
    // Calcul et affichage des totaux de quantité et prix, au chargement de la page.
const totalQuantity=document.getElementById("totalQuantity");
const totalPrice=document.getElementById("totalPrice");

let qtyTotal=0;
let priceTotal=0;

for(let i=0; i<cart.length; i++){
    qtyTotal+=parseInt(cart[i].qty);
    priceTotal+= (parseInt(cart[i].qty) * parseInt(produits.find(item=>item._id ===cart[i].id).price));
}
totalQuantity.innerText=qtyTotal;
totalPrice.innerText=priceTotal;


    // Event for quantities modification / save in localStorage / update price and quantities
    // Event de Gestion des modifications de quantités / sauvegarde dans le localStorage / mise à jour du total Quantité et prix

let qtyInput=document.querySelectorAll(".itemQuantity");
    // querySelectorAll donne une collection d'élément de la classe itemQuantity, il faut boucler sur ce tableau pour appliquer l'event sur tous les input de modification.
qtyInput.forEach(el => {el.addEventListener('change', function(){
    const currentElement=el.closest('article') ;
    let initialQty=cart.find(i => i.id === currentElement.dataset.id && i.color === currentElement.dataset.color).qty;
    let itemToModify= cart.find(i => i.id === currentElement.dataset.id && i.color === currentElement.dataset.color);
    itemToModify.qty=parseInt(this.value);
    saveCart(cart); 

            // display quantity and price sum at the page loading
            // Calcul et affichage des totaux de quantité et prix, au chargement de la page.
    let qtyDifference=parseInt(itemToModify.qty)-parseInt(initialQty);
    qtyTotal+=qtyDifference;

    let priceDifference = (qtyDifference *parseInt(produits.find(item=>item._id ===itemToModify.id).price));
    priceTotal+=priceDifference;
    totalQuantity.innerText=qtyTotal;
    totalPrice.innerText=priceTotal;
});
});

    // Event to remove completely an item
    // Gestion de la suppression complète d'un item
let deleteItems=document.querySelectorAll(".deleteItem");
deleteItems.forEach(el => {el.addEventListener('click', function(){
    const currentElement=el.closest('article') ;
    let itemToDelete= cart.indexOf(cart.find(i => i.id === currentElement.dataset.id && i.color === currentElement.dataset.color));
    let qtyExpectedToBeDeleted=cart[itemToDelete].qty;
    let itemToDeleteId=cart[itemToDelete].id;
    console.log(itemToDelete);
    console.log(itemToDeleteId);
    console.log(qtyExpectedToBeDeleted);

    cart.splice(itemToDelete, 1);
    qtyTotal-=parseInt(qtyExpectedToBeDeleted);
    priceTotal-=(parseInt(qtyExpectedToBeDeleted)* parseInt(produits.find(item=>item._id ===itemToDeleteId).price));
    saveCart(cart);
    document.location.reload()
    totalQuantity.innerText=qtyTotal;
    totalPrice.innerText=priceTotal;

});
});


// ------------ Form settings
// ------------ Gestion du formulaire

    // Event for a reset button
    // Event bouton Réinitialiser: efface tout le contenu des inputs

    const reset= document.getElementById("reset");
    reset.addEventListener('click', function(){
        firstNameError.innerText="";
        lastNameError.innerText="";
        addressError.innerText="";
        cityError.innerText="";
        emailError.innerText="";
    })

    // Checking input validity 
    // Vérification des données entrées.
    const submitValidation= document.getElementById("order");
        const formInputs=document.querySelectorAll('div.cart__order__form__question > input');
        const formp=document.querySelectorAll('div.cart__order__form__question > p');

        let firstName=document.getElementById("firstName");
        let firstNameError=document.getElementById("firstNameErrorMsg");
        let lastName = document.getElementById("lastName");
        let lastNameError=document.getElementById("lastNameErrorMsg");
        let address= document.getElementById("address");
        let addressError=document.getElementById("addressErrorMsg");
        let city=document.getElementById("city");
        let cityError=document.getElementById("cityErrorMsg");
        let email=document.getElementById("email");
        let emailError=document.getElementById("emailErrorMsg");
            let products=[];
            let contact={};
    
    // Event for form validation and sending
    // Evenement pour validation et envoi des formulaires
    submitValidation.addEventListener('click', async (e)=>{
        e.preventDefault();
        // RegEx settings for the check
        // COnfiguration des regEx pour la validation 
        let nameRegEx= /^[a-zA-ZéèîïÉÈÊÎÏ][a-zéèêàçîïüöô]+([-'\s][a-zA-ZéèîïÉÈÎÏ]+)?/;
        let mailRegEx= /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        let localisationRegEx= /^[a-zA-Z0-9éèîïÉÈÊÎÏ] [a-zéèêàçîïüöô]+([-'\s][a-zA-ZéèîïÉÈÎÏ]+)?/; ;
        let noProblem=true;
            // validation function 
            // fonction de validition et d'envoi des valeurs des input. 
            formInputs.forEach(function(el){
              let errorMsg=document.getElementById(`${el.id}ErrorMsg`);  
              

            if (el.validity.valueMissing){
                e.preventDefault();   
                errorMsg.innerText='Donnée Manquante';
                errorMsg.style.color="red";
                noProblem= false;
            }
            else {
              switch (el.id){
                case 'firstName':
                    if (nameRegEx.test(firstName.value)==false){
                        e.preventDefault();
                        firstNameError.innerText='Format incorrect';
                        firstNameError.style.color="orange";
                        noProblem= false;
                    };
                    break;
                
                case 'lastName':
                    if(nameRegEx.test(lastName.value)==false){
                        e.preventDefault();
                        lastNameError.innerText='Format incorrect';
                        lastNameError.style.color="orange";
                        noProblem= false;    
                    };
                    break;
                
                case 'email':
                    if (mailRegEx.test(email.value)==false){
                        e.preventDefault();
                        emailError.innerText='Format incorrect';
                        emailError.style.color="orange";
                        noProblem= false;
                    };
                    break;
              }}  
        });
    
        // Event to delete error messages when writting into the input
    // Event pour effacer les messages d'erreur à l'écriture dans un Input.
    formInputs.forEach(el=>el.addEventListener('keydown', function(){
        let alertToErase=document.getElementById(`${el.id}ErrorMsg`);
        alertToErase.innerText="";
    }));
    
    // Préparation des variables contenant les données à envoyer.
    //Données liées aux articles de la commande 
    // Id from the Items in the cart, soon to be purchased
    cart.forEach(function(el){
        products.push(el.id);
    });

// Données liées aux informations acheteurs
// Buyers informations
    contact={"firstName":firstName.value,
            "lastName":lastName.value,
            "address":address.value,
            "city":city.value,
            "email":email.value};

// object to send
// objet à envoyer
    const order=JSON.stringify({contact, products});
    console.log(order);

// Configuration des routes post
    // post request
        let data;
 try{const result= await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers:{'Content-Type':'application/json; charset=utf-8'},
            body: order
        })
        data= await result.json();
    } catch (error) {
            // TypeError: Failed to fetch
            console.log('There was an error', error);
          }

        // console.log(data);
        
        location.href=`./confirmation.html?id=${data.orderId}`;
        localStorage.clear();

    });