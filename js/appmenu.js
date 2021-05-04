"use strict";
let allMeals = [];
let counter = 0;
if (allMeals.length) {
  allMeals.length = JSON.parse(localStorage.getItem("savedMeal"));
  // onLoad();
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
  onLoad();
}

function ready() {
  let removeCartItemButtom = document.getElementsByClassName("btn-danger");
  for (let index = 0; index < removeCartItemButtom.length; index++) {
    let button = removeCartItemButtom[index];
    button.addEventListener("click", removeCartItem);
  }
  let quantityInput = document.getElementsByClassName("cart-quantity-input");
  for (let index = 0; index < quantityInput.length; index++) {
    let input = quantityInput[index];
    input.addEventListener("change", quantityChaned);
  }

  let addToCartButtons = document.getElementsByClassName("price-bottom");
  for (let index = 0; index < addToCartButtons.length; index++) {
    let button = addToCartButtons[index];
    button.addEventListener("click", addTOCardClicked);
  }
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchedClicked);
}
function purchedClicked() {
  alert("Thank You For Your Purchase");
  let cartItems = document.getElementsByClassName("class-items")[0];
  console.log(cartItems);
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  // let updatedMeal = [];
  // console.log(allMeals);
  // for (let index = 0; index < allMeals.length; index++) {
  //   if (buttonClicked !== allMeals[index].id) {
  //     updatedMeal.push(allMeals[index]);
  //   }
  // }
  allMeals.splice(buttonClicked.id, 1);
  localStorage.setItem("savedMeal", JSON.stringify(allMeals));
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
  // onLoad();
}

function quantityChaned(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addTOCardClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-Title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let imgSrc = shopItem.getElementsByClassName("img-fluid")[0].src;

  addItemtToCart(title, price, imgSrc);

  allMeals.push({ title, price, imgSrc });
  localStorage.setItem("savedMeal", JSON.stringify(allMeals));
  updateCartTotal();
}

function onLoad() {
  let savedMeals = JSON.parse(localStorage.getItem("savedMeal"));
  for (let index = 0; index < savedMeals.length; index++) {
    addItemtToCart(
      savedMeals[index].title,
      savedMeals[index].price,
      savedMeals[index].imgSrc
    );
    updateCartTotal();
  }
}

function addItemtToCart(title, price, imgSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];

  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let index = 0; index < cartItemNames.length; index++) {
    if (cartItemNames[index].innerText == title) {
      alert("This item is already added to the cart ");
      return;
    }
  }
  let cartRowContent = `
  <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imgSrc}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button id="${counter++}"  class="btn btn-danger" type="button">Remove</button>
          </div>`;
  cartRow.innerHTML = cartRowContent;
  // console.log(cartRowContent);
  cartItems.appendChild(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChaned);
}

function updateCartTotal() {
  // console.log(document.getElementsByClassName("cart-items"));
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  //console.log(cartRows);
  let total = 0;
  for (let index = 0; index < cartRows.length; index++) {
    cartRows = cartRows[index];
    let priceElement = cartRows.getElementsByClassName("cart-price")[0];
    let quatityElement = cartRows.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("JD", ""));
    let quantity = quatityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + " JD";
}

// function updateCounter() {
//   document.getElementById("itemCount").textContent =
//     "(" + this.items.length + ")";
// }
// if (cart.items) {
//   cart.updateCounter();
//   for (let i = 0; i < cart.items.length; i++) {
//     updateCartPreview(cart.items[i]);
//   }
// }
