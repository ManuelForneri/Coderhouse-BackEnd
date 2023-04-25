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
      let idMax = 0;
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
  "abc123",
  25
);
console.log(ProductM.getProducts());
ProductM.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log(ProductM.getProductById(2));

/*

if (title == "") {
      console.log("Revise que todos los campos esten completos");
    } else if (description == "") {
      console.log("Revise que todos los campos esten completos");
    } else if (price == null) {
      console.log("Revise que todos los campos esten completos");
    } else if (thumbnail == "") {
      console.log("Revise que todos los campos esten completos");
    } else if (code == null) {
      console.log("Revise que todos los campos esten completos");
    } else if (validateNewProductCode(this.products, code) == false) {
      console.log("Ya hay un producto con este codigo");
    } else if (stock == null) {
      console.log("Revise que todos los campos esten completos");
    } else {
*/
