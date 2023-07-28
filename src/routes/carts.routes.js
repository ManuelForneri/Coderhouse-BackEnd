//@ts-check
import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
export const cartRouter = Router();

cartRouter.get("/", cartsController.getAll);

cartRouter.get("/:id", cartsController.getCartById);

cartRouter.post("/", cartsController.createCart);

cartRouter.post("/:cid/product/:pid", cartsController.addProductInCart);
/*
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity = 1 } = req.body;

    const productById = await PServices.getProductById(pid);

    if (productById) {
      const deletedProduct = await CServices.deleteProduct(cid, pid, quantity);

      if (deletedProduct) {
        return res.status(200).json({
          status: "success",
          msg: "product removed from cart",
          payload: deletedProduct,
        });
      } else {
        return res.status(400).json({
          status: "error",
          msg: "The product was not removed from the cart",
        });
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "No product found to remove from cart" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Could not remove product from cart",
      error: error.message,
    });
  }
});
cartRouter.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartToEmpty = await CServices.deleteCart({ cid });
    if (cartToEmpty) {
      return res
        .status(200)
        .json({ status: "success", msg: "cart removed", payload: cartToEmpty });
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
});
*/
