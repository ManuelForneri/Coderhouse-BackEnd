import { Router } from "express";
import { CServices } from "../services/carts.service.js";
import { PServices } from "../services/products.service.js";
export const viewsRouter = Router();

viewsRouter.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    console.log(cid);
    const cartFound = await CServices.getCartById(cid);
    const plainCart = cartFound.products.map((doc) => doc.toObject());
    console.log(plainCart);
    return res.render("cart", { plainCart });
  } catch (e) {
    return res.render("error");
  }
});
viewsRouter.get("/product-details/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productFound = await PServices.getProductById(pid);
    console.log(productFound);
    return res.render("product-detail");
  } catch (e) {
    return res.render("error");
  }
});
viewsRouter.get("/", (req, res) => {
  return res.render("index");
});
