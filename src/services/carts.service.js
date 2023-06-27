import { cartsModel } from "../DAO/models/carts.model.js";

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
    const cartById = await cartsModel.findOne(
      { _id: cid },
      {
        __v: false,
      }
    );
    return cartById;
  }
  async create() {
    const cartCreated = await cartsModel.create({
      products: [],
    });
    return cartCreated;
  }

  async addProductToCart(cid, pid) {
    try {
      const findProdInCart = await cartsModel.findOne({
        products: { $elemMatch: { pid: pid } },
      });

      if (findProdInCart) {
        const productToUpdate = findProdInCart.products.find(
          (product) => product.pid === pid
        );
        if (productToUpdate) {
          await cartsModel.updateOne(
            { _id: cid, "products.pid": pid },
            { $inc: { "products.$.quantity": 1 } }
          );
        }
      } else {
        await cartsModel.findOneAndUpdate(
          { _id: cid },
          { $push: { products: { pid: pid, quantity: 1 } } }
        );
      }
      const cartToUpdate = await cartsModel.findOne({ _id: cid });
      return cartToUpdate;
    } catch (error) {
      console.error("Error updating cart:", error);
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
