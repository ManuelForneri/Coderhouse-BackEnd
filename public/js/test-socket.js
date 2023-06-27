const socket = io();

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescription = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputThumbnail = document.getElementById("form-thumbnail");
const inputCategory = document.getElementById("form-category");
const dinamicListProducts = document.getElementById("dinamic-list-products");

socket.on("products", (newProductsList) => {
  console.log(newProductsList);
  let newProducts = "";
  newProductsList.map((p) => {
    newProducts += `<div class="card-realtime">
        <div>Id: ${p._id} </div>
        <div>Titulo: ${p.title} </div>
        <div>Precio: ${p.price} </div>
        <div>Descripcion: ${p.description} </div>
        <div>Imagen: ${p.thumbnail} </div>
        <div>Codigo: ${p.code} </div>
        <div>Stock: ${p.stock} </div>
        <div>Stock: ${p.category} </div>
      </div>
      `;
  });
  dinamicListProducts.innerHTML = newProducts;
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
    category: inputCategory.value,
  };
  socket.emit("new-product", newProduct);
});
