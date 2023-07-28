import { CServices } from "../services/carts.service.js";
import { PServices } from "../services/products.service.js";

class CartsController {
  async getAll(res, req) {
    try {
      const query = req.query;
      if (!query.limit) {
        const carts = await CServices.getLimit(query.limit);
        return res.status(200).json({
          status: "success",
          msg: "listado de Carritos",
          payload: carts,
        });
      } else {
        const carts = await CServices.getAll();
        return res.status(200).json({
          status: "success",
          msg: "listado de Carritos",
          payload: carts,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }
  async getCartById(res, req) {
    try {
      const { id } = req.params;
      const cartFound = await CServices.getCartById(id);

      if (cartFound) {
        return res
          .status(201)
          .json({ status: "success", msg: "cart found", payload: cartFound });
      } else {
        return res
          .status(400)
          .json({ status: "error", msg: "The indicated cart was not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "error", msg: "Internal Server Error" });
    }
  }
}
export const cartsController = new CartsController();
