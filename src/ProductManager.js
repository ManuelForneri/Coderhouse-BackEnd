import fs from "fs";

function validateNewProductCode(products, code) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].code === code) {
      return true;
    }
  }
  return false;
}
function validateNewProduct(newProduct, products) {
  let flagError = false;
  if (
    !newProduct.title ||
    !newProduct.description ||
    !newProduct.price ||
    !newProduct.thumbnail ||
    !newProduct.code ||
    !newProduct.stock
  ) {
    console.log("Los parámetros no pueden estar vacíos");
    flagError = true;
  } else if (isNaN(newProduct.price) || isNaN(newProduct.stock)) {
    console.log("El precio y el stock tienen que ser de tipo numerico");
    flagError = true;
  } else if (validateNewProductCode(products, newProduct.code)) {
    console.log("Ya hay un producto con este codigo");
    flagError = true;
  }

  return flagError;
}

export class ProductManager {
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

  addProduct(newProduct) {
    let flag = validateNewProduct(newProduct, this.products);
    if (flag) {
    } else {
      let idMax = this.products.length;
      this.products.forEach((prod) => {
        if (prod.id > idMax) {
          idMax = prod.id;
        }
      });
      idMax++;
      newProduct.id = idMax;
      this.products.push(newProduct);
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
      (product) => product.id == idSearch
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
      return searchedProduct;
    }
  }

  removeProduct(idSearch) {
    const searchedProduct = this.products.find(
      (product) => product.id == idSearch
    );
    if (searchedProduct === undefined) {
      return false;
    } else {
      this.products = this.products.filter((product) => product.id != idSearch);

      let productFile = JSON.stringify(this.products);

      fs.writeFileSync("products.txt", productFile, (err) => {
        if (err) {
          rejects("error al escribir el archivo (deletedProducts)");
        } else {
          resolve("archivo escrito correctamente (deletedProducts)");
        }
      });
      return true;
    }
  }
}

const ProductM = new ProductManager();
console.log(ProductM.getProducts());
