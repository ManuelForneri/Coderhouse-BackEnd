const fs = require("fs");

function validateNewProductCode(products, code) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].code === code) {
      return true;
    }
  }
  return false;
}
function validateNewProduct(
  title,
  description,
  price,
  thumbnail,
  code,
  stock,
  products
) {
  let flagError = false;
  if (!title || !description || !price || !thumbnail || !code || !stock) {
    console.log("Los parámetros no pueden estar vacíos");
    flagError = true;
  } else if (isNaN(price) || isNaN(stock)) {
    console.log("El precio y el stock tienen que ser de tipo numerico");
    flagError = true;
  } else if (validateNewProductCode(products, code)) {
    console.log("Ya hay un producto con este codigo");
    flagError = true;
  }

  return flagError;
}

class ProductManager {
  constructor() {
    this.products = [];
    this.LoadProducts();
  }
  async LoadProducts() {
    try {
      const data = fs.readFileSync("products.txt", "utf-8");
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (err) {
      console.log(`Error al leer el archivo: ${err.message}`);
    }
  }
  getProducts() {
    return this.products;
  }
  getProductById(idSearch) {
    const products = this.getProducts();
    let searchedProduct = products.find((product) => product.id === idSearch);
    if (searchedProduct === undefined) {
      return console.log("Not found");
    } else {
      return console.table(searchedProduct);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let flag = validateNewProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      this.products
    );
    if (flag) {
    } else {
      let idMax = this.products.length;
      this.products.forEach((prod) => {
        if (prod.id > idMax) {
          idMax = prod.id;
        }
      });
      idMax++;
      const productCrated = {
        id: idMax,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(productCrated);
      let productFile = JSON.stringify(this.products);

      fs.writeFileSync("products.txt", productFile, (err) => {
        if (err) {
          return console.log("error al escribir el archivo (addProducts)");
        } else {
          return console.log("archivo escrito correctamente (addProducts)");
        }
      });
    }
  }

  updateProduct(idSearch, updateProduct) {
    const searchedProduct = this.products.find(
      (product) => product.id === idSearch
    );
    if (searchedProduct === undefined) {
      console.log("No se encontro ningun producto con esas caracteristicas");
    } else {
      Object.assign(searchedProduct, updateProduct);

      let productFile = JSON.stringify(this.products);

      fs.writeFileSync("products.txt", productFile, (err) => {
        if (err) {
          console.log("error al escribir el archivo (updateProducts)");
        } else {
          console.log("archivo escrito correctamente (updateProducts)");
        }
      });
      console.log("Producto Actualizado correctamente");
    }
  }

  removeProduct(idSearch) {
    const searchedProduct = this.products.find(
      (product) => product.id === idSearch
    );
    if (searchedProduct === undefined) {
      console.log("No se encontro ningun producto con esas caracteristicas");
    } else {
      this.products = this.products.filter(
        (product) => product.id !== idSearch
      );

      let productFile = JSON.stringify(this.products);

      fs.writeFileSync("products.txt", productFile, (err) => {
        if (err) {
          rejects("error al escribir el archivo (deletedProducts)");
        } else {
          resolve("archivo escrito correctamente (deletedProducts)");
        }
      });
      console.log("Producto eliminado correctamente");
    }
  }
}
module.exports = ProductManager;

const ProductM = new ProductManager();
console.log(ProductM.getProducts());

ProductM.addProduct(
  "Producto 1",
  "Este es un producto prueba",
  2000,
  "Sin imagen",
  "#1",
  25
);
ProductM.addProduct(
  "Producto 2",
  "Este es un producto prueba",
  3500,
  "Sin imagen",
  "#2",
  2
);
ProductM.addProduct(
  "Producto 3",
  "Este es un producto prueba",
  22000,
  "Sin imagen",
  "#3",
  5
);
ProductM.addProduct(
  "Producto 4",
  "Este es un producto prueba",
  2500,
  "Sin imagen",
  "#4",
  10
);
ProductM.addProduct(
  "Producto 5",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "#5",
  250
);
ProductM.addProduct(
  "Producto 6",
  "Este es un producto prueba",
  2000,
  "Sin imagen",
  "#6",
  100
);
ProductM.addProduct(
  "Producto 7",
  "Este es un producto prueba",
  20000,
  "Sin imagen",
  "#7",
  3
);
ProductM.addProduct(
  "Producto 8",
  "Este es un producto prueba",
  20,
  "Sin imagen",
  "#8",
  30
);
ProductM.addProduct(
  "Producto 9",
  "Este es un producto prueba",
  1000,
  "Sin imagen",
  "#9",
  40
);
ProductM.addProduct(
  "Producto 10",
  "Este es un producto prueba",
  120,
  "Sin imagen",
  "#10",
  35
);

console.log(ProductM.getProducts());
