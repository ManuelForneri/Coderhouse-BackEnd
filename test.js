class ProductManage {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
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
    } else if (stock == null) {
      console.log("Revise que todos los campos esten completos");
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
ProductM.addProduct(
  "Reloj casio",
  "Reloj de Dama, con malla de acero",
  10000,
  "",
  "133",
  3
);
ProductM.addProduct(
  "Reloj Lemon",
  "Reloj de Caballero, con malla de acero",
  12000,
  "../assets/relojCaballero.jpg",
  "234",
  3
);
console.log(ProductM.getProducts());
