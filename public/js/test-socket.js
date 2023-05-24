const socket = io();

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescription = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputThumbnail = document.getElementById("form-thumbnail");

socket.on("products", (products) => {
  console.log(products);
});

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
    code: inputCode.value,
    stock: inputStock.value,
    thumbnail: inputThumbnail.value,
  };
  socket.emit("new-product", newProduct);
});
