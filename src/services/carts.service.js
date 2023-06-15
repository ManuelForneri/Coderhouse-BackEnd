//@ts-check
import { cartsModel } from "../DAO/models/carts.model.js";
import { ObjectId } from "mongodb";

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
            { _id: new ObjectId(cid), "products.pid": pid },
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
}
export const CServives = new cartsServices();
