// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  calculateTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getTotalItems() {
    return this.items.length;
  }

  addItem(product, quantity) {
    const cartItem = new ShoppingCartItem(product, quantity);
    this.items.push(cartItem);
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  displayCartItems() {
    this.items.forEach((item) => {
      console.log(
        `Product: ${item.product.name}, Quantity: ${
          item.quantity
        }, Total Price: ${item.calculateTotalPrice()}`
      );
    });
  }

  getTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.calculateTotalPrice(),
      0
    );
  }
}

// Instantiate products
const apple = new Product(1, "Apple", 0.5);
const banana = new Product(2, "Banana", 0.3);

const cart = new ShoppingCart();

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".card");
  const totalPriceElement = document.querySelector(".total");

  products.forEach((product) => {
    const plusButton = product.querySelector(".fa-plus-circle");
    const minusButton = product.querySelector(".fa-minus-circle");
    const quantityElement = product.querySelector(".quantity");
    const unitPrice = parseFloat(
      product.querySelector(".unit-price").innerText.split(" ")[0]
    );
    let quantity = 0;

    plusButton.addEventListener("click", () => {
      quantity++;
      quantityElement.innerText = quantity;
      cart.addItem(
        new Product(product.dataset.id, product.dataset.name, unitPrice),
        quantity
      );
      updateTotalPrice();
    });

    minusButton.addEventListener("click", () => {
      if (quantity > 0) {
        quantity--;
        quantityElement.innerText = quantity;
        cart.removeItem(product.dataset.id);
        updateTotalPrice();
      }
    });

    function updateTotalPrice() {
      totalPriceElement.innerText = `${cart.getTotalPrice()} $`;
    }
  });

  const heartIcons = document.querySelectorAll(".fa-heart");
  const trashIcons = document.querySelectorAll(".fa-trash-alt");

  heartIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("text-danger");
    });
  });

  trashIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const cardBody = e.target.closest(".card-body");
      cart.removeItem(cardBody.querySelector(".fa-plus-circle").dataset.id);
      cardBody.parentElement.remove();
      updateTotalPrice();
    });
  });

  function updateTotalPrice() {
    totalPriceElement.innerText = `${cart.getTotalPrice()} $`;
  }
});
