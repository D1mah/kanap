
//----------- Functions for cart management in the localStorage. 
//----------- Definition des fonctions de stockage et lecture du panier dans le localStorage


// function to save the cart in the localStorage
// fonction pour sauvegarder le panier dans le localStorage
export function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
  }


// function to get the cart if existing in the localStorage
// fonction pour récupérer le panie si il existe dans le localStorage.
export function getCart(){
    let cart= localStorage.getItem("cart");
    if (cart==null){
      return [];
    }else{
      return JSON.parse(cart);
    } 
  }


// Removal function for tests
// Fonction de suppression du panier dans le localStorage, pour phase de test 
export function deleteCart(){
    localStorage.removeItem("cart");
  }