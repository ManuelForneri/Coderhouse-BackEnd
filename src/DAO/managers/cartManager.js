import fs from "fs";

const cartsFile = "carts.txt";

export class CartManager {
  constructor() {
    this.carts = [];
    //this.LoadCarts();
  }
  async LoadCarts() {
    try {
      const data = fs.readFileSync(cartsFile, "utf-8");
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
    fs.writeFileSync(cartsFile, cartsFile, (err) => {
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
    fs.writeFileSync(cartsFile, cartsFile, (err) => {
      if (err) {
        return console.log("error al escribir el archivo (addProductCart)");
      } else {
        return console.log("archivo escrito correctamente (addProductCart)");
      }
    });
    return cartSearched;
  }

  removeProductCart(cartId, productId) {
    const carts = this.getCarts();
    const cartSearched = carts.find((cart) => cart.id == cartId);
    if (!cartSearched) {
      throw new Error(`Carrito con el ID ${cartId} no encontrado`);
    }
    const existProduct = cartSearched.products.find(
      (product) => product.id == productId
    );
    if (existProduct == false) {
      return "El producto no existe en su carrito";
    } else {
      existProduct.quantity -= 1;
    }
    let cartFilter = [];

    if (existProduct.quantity === 0) {
      cartFilter = carts.cartId.products.filter((p) => p.id != productId);
    } else {
      cartFilter = this.carts;
    }
    let cartsFile = JSON.stringify(cartFilter);
    fs.writeFileSync(cartsFile, cartsFile, (err) => {
      if (err) {
        return console.log("error al escribir el archivo (addProductCart)");
      } else {
        return console.log("archivo escrito correctamente (addProductCart)");
      }
    });
    return cartFilter;
  }
}
