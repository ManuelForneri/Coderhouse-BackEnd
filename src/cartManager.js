import fs from "fs";

export class CartManager {
  constructor() {
    this.carts = [];
    this.LoadCarts();
  }
  async LoadCarts() {
    try {
      const data = fs.readFileSync("carts.txt", "utf-8");
      if (data) {
        this.carts = JSON.parse(data);
      }
    } catch (err) {
      console.log(`Error al leer el archivo: ${err.message}`);
    }
  }
  getCarts() {
    return this.carts;
  }

  getCartById(idSearch) {
    const carts = this.getCarts();
    let searchedCart = carts.find((cart) => cart.id == idSearch);
    if (searchedCart === undefined) {
      return console.log("Not found");
    } else {
      return searchedCart;
    }
  }

  createCart() {
    let idMax = this.carts.length;
    this.carts.forEach((cart) => {
      if (cart.id > idMax) {
        idMax = cart.id;
      }
    });
    idMax++;

    const newCart = { id: idMax, products: [] };
    this.carts.push(newCart);
    let cartsFile = JSON.stringify(this.carts);
    fs.writeFileSync("carts.txt", cartsFile, (err) => {
      if (err) {
        return console.log("error al escribir el archivo (addCart)");
      } else {
        return console.log("archivo escrito correctamente (addCart)");
      }
    });
    return newCart;
  }

  addProductCart(cartId, productId) {
    const carts = this.getCarts();
    const cartSearched = carts.find((cart) => cart.id == cartId);
    if (!cartSearched) {
      throw new Error(`Carrito con el ID ${cartId} no encontrado`);
    }
    const existProduct = cartSearched.products.find(
      (product) => product.id == productId
    );
    if (existProduct) {
      existProduct.quantity += 1;
    } else {
      cartSearched.products.push({ id: productId, quantity: 1 });
    }
    let cartsFile = JSON.stringify(this.carts);
    fs.writeFileSync("carts.txt", cartsFile, (err) => {
      if (err) {
        return console.log("error al escribir el archivo (addProductCart)");
      } else {
        return console.log("archivo escrito correctamente (addProductCart)");
      }
    });
    return cartSearched;
  }

  removeProduct(idSearch) {
    const searchedCart = this.carts.find((cart) => cart.id == idSearch);
    if (searchedCart === undefined) {
      return false;
    } else {
      this.carts = this.carts.filter((cart) => cart.id != idSearch);

      let cartsFile = JSON.stringify(this.carts);

      fs.writeFileSync("products.txt", cartsFile, (err) => {
        if (err) {
          rejects("error al escribir el archivo (deletedCarts)");
        } else {
          resolve("archivo escrito correctamente (deletedCarts)");
        }
      });
      return true;
    }
  }
}
