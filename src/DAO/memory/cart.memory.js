export default class CartsMemory {
  constructor() {
    this.carts = [];
  }

  async getAll() {
    return this.carts;
  }
  async createCart() {
    const cartCreated = {
      id: Date(),
      products: [],
    };
    this.carts.push(cartCreated);
    return cartCreated;
  }
  getCartById(idSearch) {
    const carts = this.getAll();
    let searchedCart = carts.find((cart) => cart.id == idSearch);
    if (searchedCart === undefined) {
      return { message: "cart not found", payload: [] };
    } else {
      return searchedCart;
    }
  }
  async addProductToCart(cid, pid, quantityParams) {
    try {
      const cart = await cartMongoose.getCartById(cid);
      //cambiar a mongoose (products)
      const product = await ProductModel.findById(pid);

      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }
      const findProdInCart = await cartsModel.findOne({
        products: { $elemMatch: { product: pid } },
      });

      if (findProdInCart) {
        await cartMongoose.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": quantityParams } }
        );
      } else {
        cart.products.push({ product: product._id, quantity: quantityParams });
      }
      await cart.save();
      const updatedCart = await cartMongoose.findById(cid);

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
  async deleteProductInCart(cid, pid) {
    try {
      const cart = await cartMongoose.findById(cid);
      const product = await ProductModel.findById(pid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }

      const findProdInCart = await cartMongoose.findOne({
        products: { $elemMatch: { product: pid } },
      });

      if (findProdInCart) {
        await cartMongoose.updateOne(
          { _id: cid, "products.product": pid },
          {
            $inc: { "products.$.quantity": -1 },
          }
        );
      }

      await cart.save();
      const updatedCart = await cartMongoose.findById(cid);

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
  async deleteCart(cid) {
    try {
      const updatedCart = await cartMongoose.findOneAndUpdate(
        { _id: cid },
        { products: [] },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new error();
    }
  }
}

export const cartsMemory = new CartsMemory();
