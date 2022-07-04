let label = document.querySelector("#label");
let ShoppingCart = document.querySelector("#shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
//console.log(basket);
let calculation = () => {
  //
  let carticon = document.getElementById("cartAmount");
  carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  //console.log();
};

calculation();

//function de géneration des cartes
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket.map((x)=>{
        let {id,item} = x;
        let search = shopItemsData.find((y)=> y.id === id) || [];
        //console.log("rep : " + search);
        return `
        <div class="cart-item">
            <img width = "100" src=${search.img} alt=""/>
            <div class="details">

                <div class = "title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>

                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                        ${item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i> 
                </div>

                <h3>$ ${item * search.price}</h3>
            </div>
        </div>
        `;
    }).join(""));
  } else {
    //panier est vide, on définie les éléments html qui s'affichera
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Panier vide</h2>
        <a href="index.html">
            <button class="HomeBtn">Retour au menu</button>
        </a>
        `;
  }
};

generateCartItems();

let increment = (id) => {
  //la fonction test si l'objet existe dans le panier
  //si oui, il incremente son compteur
  //si non, il crée l'élément
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  //console.log(search);
  if (search === undefined) {
    //si y'a rien dans la basket
    basket.push({
      //ajoute l'id et met l'item à 1;
      id: selectedItem.id,
      item: 1, //on compte le premier fois qu'il a cliqué
    });
  } else {
    //ici le panier n'est pas vide, il incremente le conteur de panier
    search.item += 1;
  }

  //generateCartItems();
  update(selectedItem.id);

  //ajout de l'objet dans le localstorage tout en le convertissant en JSON
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => { 
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  //console.log(search);

  if (search === undefined) return;
  else if (search.item === 0) return; //si le panier est 0, on ne fait rien
  else {
    //ici le panier n'est pas 0, on decremente le conteur de panier
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("data", JSON.stringify(basket));
  //generateCartItems();
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  generateCartItems();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  
};