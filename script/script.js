

/* Array With Products */

const products = [
   {
      id: 0,
      name: "T-short Orange",
      price: 150,
      img: "./img/t-short1.avif",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae expedita fugiat tenetur omnis molestiae maxime illum in voluptatem consectetur!",
      sizes: {
         small: "Small",
         medium: "Medium",
         large: "Large",
         xl: "X-large"
      }
   },
   {
      id: 1,
      name: "T-short Palm",
      price: 170,
      img: "./img/t-short2.avif",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae expedita fugiat tenetur omnis molestiae maxime illum in voluptatem consectetur!",
      sizes: {
         small: "Small",
         medium: "Medium",
         large: "Large",
         xl: "X-large"
      }
   },
   {
      id: 2,
      name: "T-short Yes",
      price: 190,
      img: "./img/t-short3.avif",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae expedita fugiat tenetur omnis molestiae maxime illum in voluptatem consectetur!",
      sizes: {
         small: "Small",
         medium: "Medium",
         large: "Large",
         xl: "X-large"
      }
   },
   {
      id: 3,
      name: "T-short Not Today",
      price: 210,
      img: "./img/t-short4.avif",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae expedita fugiat tenetur omnis molestiae maxime illum in voluptatem consectetur!",
      sizes: {
         small: "Small",
         medium: "Medium",
         large: "Large",
         xl: "X-large"
      }
   },
   {
      id: 4,
      name: "T-short Heart",
      price: 230,
      img: "./img/t-short5.avif",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae expedita fugiat tenetur omnis molestiae maxime illum in voluptatem consectetur!",
      sizes: {
         small: "Small",
         medium: "Medium",
         large: "Large",
         xl: "X-large"
      }
   },
   {
      id: 5,
      name: "T-short Whatever",
      price: 250,
      img: "./img/t-short6.avif",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae expedita fugiat tenetur omnis molestiae maxime illum in voluptatem consectetur!",
      sizes: {
         small: "Small",
         medium: "Medium",
         large: "Large",
         xl: "X-large"
      }
   },
]

/* Using method .map to add products in carousel */

const carousel = document.querySelector(".carousel"); 

carousel.innerHTML = products.map((value) => {
   const {id, name, price, img } = value;
   return `
      
         <div class="product__card">
            <h3>${name}</h3>
               <figure>
                  <img src=${img} alt=${name}>
               </figure>
            <p>Price: ${price} $</p>
            <button onClick="activatePopUp(); addToCartFormPopUp(${id})">Add To Cart</button>
         </div>
      
   `
   
}).join("");





/* Pop-up Menu */

const popUpMenu = document.querySelector(".pop-up");
const popUpContent = document.querySelector(".pop-up__wrapp");

let size = 0;
let color = 0;

function activatePopUp() {
   popUpMenu.classList.add("active");
   document.body.style.overflow = "hidden";
}

function closePoUp() {
   popUpMenu.classList.remove("active");
   document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => {
   if (e.target === popUpMenu) {
      popUpMenu.classList.remove("active");
      document.body.style.overflow = "auto";
   }
})

function setSizes(n) {
   const sizesInHtml = document.querySelectorAll(".sizes__options");
   sizesInHtml.forEach(size => {
      size.classList.remove("active");
      sizesInHtml[n].classList.add("active");
   })
   size = n;
}

function setColor(col) {
   color = col
}



function addToCartFormPopUp(id) {
   const addProductArr = products.filter(item => item.id === id);
   
  
   popUpContent.innerHTML = addProductArr.map(value => {
      const {id, name, price, img, description, sizes } = value;
      const sizesInHtml = document.querySelectorAll(".sizes__options");
      
      return `
            <i onClick="closePoUp()" class="bi bi-x-circle"></i>
            <figure class="figure">
               <img src=${img} alt=${name}>
            </figure>
            <div class="product__features">
               <h3>${name}</h3>
               <div class="product__features--stars">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-half"></i>
               </div>
               <p>${description}</p>
               <p>Price: ${price} $</p>
               <div class="product__features--colors">
                  <p><span>Select Colors</span></p>
                  <div class="colors__wrapp">
                     <div onClick="setColor(0)" class="colors" style="background-color: red;"></div>
                     <div onClick="setColor(1)" class="colors" style="background-color: green;"></div>
                     <div onClick="setColor(2)" class="colors" style="background-color: black;"></div>
                     <div onClick="setColor(3)" class="colors" style="background-color: white;"></div>
                  </div>
               </div>
               <div class="product__features--size">
                  <p><span>Choose Size</span></p>
                  <div class="sizes">
                     <p onClick="setSizes(0);" class="sizes__options active">${sizes.small}</p>
                     <p onClick="setSizes(1);" class="sizes__options">${sizes.medium}</p>
                     <p onClick="setSizes(2);" class="sizes__options">${sizes.large}</p>
                     <p onClick="setSizes(3);" class="sizes__options">${sizes.xl}</p>
                  </div>
               </div>
               <button onClick="addProduct(${id}); closePoUp();">Add To Cart</button>
            </form>
         
      `
   })
   
}

/* Cart */

let basket = [];
const cartItems = document.querySelector(".cart__items");

function getCartItems() {
   cartItems.innerText = basket.length;
}

function addProduct (id) {
   let selectedItem = id;
   let search = basket.find((x) => x.id === selectedItem && x.color === color && x.size === size);
  
    if (search === undefined) {
      basket.push({
         id: selectedItem,
         color: color,
         size: size,
         item: 1
      })
   } else {
      search.item += 1;
   }
   
   getCartItems();
   cartElements();
   getTotalPrice()
}

function decrementProduct (id) {
   let selectedItem = id;
   let search = basket.find((x) => x.id === selectedItem && x.color === color && x.size === size);
  
   if (search === undefined) return;
   else if (search.item === 0) return;
   else {
      search.item -= 1;
   }
   basket = basket.filter((x) => x.item !== 0);
   getCartItems();
   cartElements();
   getTotalPrice()
}

const removeItem = (id) => {
   let selectedItem = id;
   basket = basket.filter((x) => x.id !== selectedItem);
   getCartItems();
   cartElements();
   getTotalPrice()
}

/* Shopping Cart Menu */

const cartElement = document.querySelector(".cart");
const shoppingMenu = document.querySelector(".shopping__cart");
const cart = document.querySelector(".menu__container");
const closeElement = document.querySelector(".menu i");
const labelElement = document.querySelector(".label");



window.addEventListener("click", (e) => {
   if (e.target === shoppingMenu) {
      shoppingMenu.classList.toggle("active")
      document.body.style.overflow = shoppingMenu.className.includes("active") 
      ? "hidden"
      : "auto";
   }
})

function handleClick () {
   shoppingMenu.classList.toggle("active")
   document.body.style.overflow = shoppingMenu.className.includes("active") 
   ? "hidden" 
   : "auto";
   
}

cartElement.addEventListener("click", handleClick);
closeElement.addEventListener("click", handleClick);

function cartElements() {
   if (basket.length !== 0) {
      return (cart.innerHTML = basket.map(value => {
         const { id, item, color, size } = value;
         const search = products.find(x => x.id === id) || [];
         const { img, name, price} = search;

         return `
            <div class="cart__container">
               <div onClick="removeItem(${id})" class="trash"><i class="bi bi-trash3"></i></div>
               <figure>
                  <img src=${img} alt=${name}>
               </figure>
               <div class="cart__container--description">
                  <h4>${name}</h3>
                  <div class="cart__color">
                     <p>Color: </p> 
                     <div style="
                        background-color: ${color === 0 ? "red" : color === 1 ? "green" : color === 2 ? "black" : "white"}; 
                        border: 1px solid rgba(128, 128, 128, 0.667);
                        width: 15px; 
                        height: 15px;
                        border-radius: 50%;
                        margin-left: 10px;"
                     >
                     </div>
                  </div>
                  <div class="cart__size">
                     <p>Size:</p> 
                     <p>${size === 0 ? "Small" : size === 1 ? "Medium" : size === 2 ? "Large" : "X-large"}</p>
                  </div>
                  <div class="cart__price">
                     <p>Price: ${price} $</p>
                     <div class="cart__price--items">
                        <p><i onClick="decrementProduct(${id})" class="bi bi-dash-circle"></i></p>
                        <p>${item}</p>
                        <p><i onClick="addProduct(${id})" class="bi bi-plus-circle"></i></p>
                     </div>
                  </div>
               </div>
              
            </div>
             
         `
      }).join(""))
   } else {
      return cart.innerHTML = `
         <div class="no-items">
            <h2>Empty. Please add any products</h2>
         </div>
      `
   }
}

cartElements();

function getTotalPrice() {
   
   if (basket.length !==0) {
      const amount = basket.map(x => {
         let { item, id } = x;
         let search = products.find((y) => y.id === id) || [];
         return item * search.price;
      }).reduce((x, y) => x + y, 0);
      const total = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
      labelElement.innerHTML = `
         <h2>Order Summary</h2>
         <div class="quantity__container">
            <p>Quantity:</p>
            <p>${total}</p>
         </div>
         <div class="total__container">
            <p>Total:</p>
            <p>${amount} $</p> 
         </div>
         
         `
   } else {
       labelElement.innerHTML = ``
   }
}

getTotalPrice() 

/* Added function .preventDefault() to stop refresh the page on form submit */

const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", e => e.preventDefault());
   

/* Carousel */

const arrows = document.querySelectorAll(".slider i");
const card = document.querySelector(".product__card");
//const cardWidth = card.clientWidth;
const cardWidth = card.scrollWidth;

/* Perform actions when the end of scroll is reached */
carousel.addEventListener("scroll", () => {
   if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
      arrows[0].classList.remove("active");
   } else {
      arrows[0].classList.add("active");
   }
   if (carousel.scrollRight + carousel.clientWidth >= carousel.scrollWidth) {
      arrows[1].classList.remove("active");
   }
})


function setScroll(arrow) {
   arrow.addEventListener("click", e => {
      if (e.target.id === "right") arrows[1].classList.add("active");
      carousel.scrollLeft += e.target.id === "left" ? -cardWidth -20 : cardWidth + 20;
   })
}

arrows.forEach(setScroll)
