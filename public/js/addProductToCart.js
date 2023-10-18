const productCountElement = document.getElementById("product-count");
const btnIncrease = document.getElementById("btn-increase");
const btnDecrease = document.getElementById("btn-decrease");
const stock = document.getElementById("stockProduct").textContent;
const addButton = document.getElementById("add-to-cart");
const pid = document.getElementById("pid").textContent;
const cid = document.getElementById("cid").textContent;
console.log(pid);
console.log(cid);

let productCount = 0;
let stockProduct = parseInt(stock);
btnIncrease.addEventListener("click", () => {
  if (productCount < stockProduct) {
    productCount++;
    updateProductCount();
  }
});
btnDecrease.addEventListener("click", () => {
  if (productCount > 0) {
    productCount--;
    updateProductCount();
  }
});
function updateProductCount() {
  productCountElement.textContent = productCount;
}
addButton.addEventListener("click", () => {
  const data = {
    quantity: productCount,
  };
  fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire("Se agrego correctamente el producto a su carrito!");
        // Puedes realizar acciones adicionales si la solicitud fue exitosa
      } else {
        console.error("Error al realizar la solicitud POST");
      }
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud POST:", error);
    });
});
