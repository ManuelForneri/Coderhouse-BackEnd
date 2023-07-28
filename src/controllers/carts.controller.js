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
  async createCart() {
    try {
      const cartCreated = await CServices.createCart({});
      return res.status(201).json({
        status: "success",
        msg: "Cart created",
        payload: cartCreated,
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }
  async addProductInCart(res, req) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const { quantity = 1 } = req.body;
      console.log(quantity);
      const productById = await PServices.getProductById(pid);

      if (productById) {
        const createdProduct = await CServices.addProductToCart(
          cid,
          pid,
          quantity
        );
        if (createdProduct) {
          return res.status(201).json({
            status: "success",
            msg: "product added to cart",
            payload: createdProduct,
          });
        } else {
          return res.status(400).json({
            status: "error",
            msg: "The product was not added to the cart",
          });
        }
      } else {
        return res
          .status(400)
          .json({ status: "error", msg: "No product found to add to cart" });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "could not add product to cart",
        error: error.message,
      });
    }
  }
}
export const cartsController = new CartsController();
