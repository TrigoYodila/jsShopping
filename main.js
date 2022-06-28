let shop = document.querySelector("#shop");

let shopItemsData = [
  {
    id: "jjjj",
    name: "Chemise Déc.",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg",
  },
  {
    id: "tttt",
    name: "Chemise Bur.",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "uuuu",
    name: "Polo",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg",
  },
  {
    id: "pppp",
    name: "Polo",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  }
];

let generateShop = () => {
  
  return (shop.innerHTML = shopItemsData
    .map((x) => {
        let { id, name, price, desc, img } = x;
      return `<div class="item" id=product-id-${id}>
            <img width="220" src=${img} alt="">

            <div class="detail">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">0</div>
                        <i class="bi bi-plus-lg"></i> 
                    </div>
                </div>
            </div>
             
        </div>
         `;
    })
    .join("")); //join pour supprimer l'espace.
};

generateShop();
