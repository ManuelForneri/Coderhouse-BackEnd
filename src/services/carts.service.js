//@ts-check
import { cartsModel } from "../DAO/models/carts.model.js";

class cartsServices {
  async getAll() {
    const carts = await cartsModel.getAll();
    return carts;
  }

  async createCart() {
    const cartCreated = await cartsModel.createCart();
    return cartCreated;
  }

  async getLimit(limit) {
    const carts = await cartsModel.getLimit(limit);
    return carts;
  }

  async addProductToCart(cid, pid, quantityParams) {
    try {
      const updatedCart = await cartsModel.addProductToCart(
        cid,
        pid,
        quantityParams
      );
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cid) {
    const cart = await cartsModel.getCartById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }

  /*
  
  async deleteProduct(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
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
        await cartsModel.updateOne(
          { _id: cid, "products.product": pid },
          {
            $inc: { "products.$.quantity": -1 },
          }
        );
        //no puedo hacer que cuando el producto llegue a 0 se elimine
      }

      await cart.save();
      const updatedCart = await cartsModel.findById(cid);

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart({ cid }) {
    try {
      const updatedCart = await cartsModel.findOneAndUpdate(
        { _id: cid },
        { products: [] },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      throw error;
    }
  }*/
}
export const CServices = new cartsServices();
