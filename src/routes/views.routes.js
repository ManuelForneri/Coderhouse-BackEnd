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
    const plainProduct = {
      _id: productFound._id.toString(),
      title: productFound.title,
      description: productFound.description,
      price: productFound.price,
      thumbnail: productFound.thumbnail,
      code: productFound.code,
      stock: productFound.stock,
      category: productFound.category,
    };
    console.log(plainProduct);
    return res.render("product-detail", { plainProduct });
  } catch (e) {
    return res.render("error");
  }
});
viewsRouter.get("/user-cart", (req, res) => {});
viewsRouter.get("/", (req, res) => {
  return res.render("index");
});
