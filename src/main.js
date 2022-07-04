let shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || []; //tableau d'objet pour stocker la quantité selectionnée

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `<div class="item" id=product-id-${id}>
            <img width="220" src=${img} alt="">

            <div class="detail">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i> 
                    </div>
                </div>
            </div>
             
        </div>
         `;
    })
    .join("")); //join pour supprimer l'espace.
};

generateShop();

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

  //console.log(basket);
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
};

//fonction update, s'execute quand on clique sur increment ou decrement
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  //
  let carticon = document.getElementById("cartAmount");
  carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  //console.log();
};

calculation();