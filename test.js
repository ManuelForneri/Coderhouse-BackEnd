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

class ProductManage {
  constructor() {
    this.products = [];
    this.LoadProducts();
  }
  LoadProducts() {
    try {
      const data = fs.readFileSync("test.txt", "utf-8");
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
  getProductById(id) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return this.products[i];
      }
    }
    return "Not found";
  }
  updateProduct() {}
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
      console.log(this.products.length);
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

      fs.writeFile("test.txt", productFile, (err) => {
        if (err) {
          console.log("error al escribir el archivo");
        } else {
          console.log("archivo escrito correctamente");
        }
      });
    }
  }
}
const ProductM = new ProductManage();
console.log(ProductM.getProducts());

ProductM.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc127",
  25
);
console.log(ProductM.getProducts());
ProductM.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc128",
  25
);
console.log(ProductM.getProductById(2));
