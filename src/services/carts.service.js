import { cartsModel } from "../DAO/models/carts.model.js";
import { ProductModel } from "../DAO/models/products.model.js";

class cartsServices {
  async getAll() {
    const carts = await cartsModel.find(
      {},
      {
        __v: false,
      }
    );
    return carts;
  }

  async getLimit(limit) {
    const carts = await cartsModel
      .find(
        {},
        {
          __v: false,
        }
      )
      .limit(limit);
    return carts;
  }

  async getCartById(cid) {
    const cart = await cartsModel.findById(cid).populate("products.product");
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }

  async create() {
    const cartCreated = await cartsModel.create({});
    return cartCreated;
  }

  async addProductToCart(cid, pid) {
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
        cart = await cartsModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": 1 } }
        );
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }
      await cart.save();
      console.log(cart);
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct({ cid, pid }) {
    try {
      const findProdInCart = await cartsModel.findOne({
        products: { $elemMatch: { pid: pid } },
      });

      if (findProdInCart) {
        const productToUpdate = findProdInCart.products.find(
          (product) => product.pid === pid
        );
        console.log(productToUpdate);
        if (productToUpdate.quantity > 1) {
          await cartsModel.updateOne(
            { _id: cid, "products.pid": pid },
            { $inc: { "products.$.quantity": -1 } }
          );
        } else {
          await cartsModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { pid: pid } } }
          );
        }
      }
      const updatedCart = await cartsModel.findOne({ _id: cid });
      return updatedCart;
    } catch (error) {
      console.error("Error deleting product from cart:", error);
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
  }
}
export const CServives = new cartsServices();
