// Get the product cards and total price container
const products = document.querySelectorAll(".card");
const totalPriceElement = document.querySelector(".total");

// Initial total price
let totalPrice = 0;

// Add event listeners to each product's buttons
products.forEach((product) => {
  const plusButton = product.querySelector(".fa-plus-circle");
  const minusButton = product.querySelector(".fa-minus-circle");
  const quantityElement = product.querySelector(".quantity");
  const unitPrice = parseFloat(
    product.querySelector(".unit-price").innerText.split(" ")[0]
  );

  let quantity = 0;

  // Update the quantity and total price when plus button is clicked
  plusButton.addEventListener("click", () => {
    quantity++;
    quantityElement.innerText = quantity;
    updateTotalPrice();
  });

  // Update the quantity and total price when minus button is clicked
  minusButton.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityElement.innerText = quantity;
      updateTotalPrice();
    }
  });

  // Function to update the total price
  function updateTotalPrice() {
    totalPrice = 0;
    products.forEach((product) => {
      const quantity = parseInt(product.querySelector(".quantity").innerText);
      const price = parseFloat(
        product.querySelector(".unit-price").innerText.split(" ")[0]
      );
      totalPrice += quantity * price;
    });
    totalPriceElement.innerText = `${totalPrice} $`;
  }
});

// Optional: Add functionality to handle heart and trash icons
const heartIcons = document.querySelectorAll(".fa-heart");
const trashIcons = document.querySelectorAll(".fa-trash-alt");

heartIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // Handle "Add to Wishlist" functionality (e.g., toggle color)
    icon.classList.toggle("text-danger");
  });
});

trashIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    // Handle "Remove from Cart" functionality
    const cardBody = e.target.closest(".card-body");
    cardBody.parentElement.remove();
    updateTotalPrice(); // Update total price after removal
  });
});
