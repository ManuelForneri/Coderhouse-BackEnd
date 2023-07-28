import { cartMongoose } from "./mongoose/carts.mongoose.js";

class CartModel {
  async getAll() {
    try {
      const carts = await cartMongoose.find(
        {},
        {
          __v: false,
        }
      );
      return carts;
    } catch (e) {
      throw e;
    }
  }
}
export const cartsModel = new CartModel();
