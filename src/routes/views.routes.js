import { Router } from "express";
import { CServives } from "../services/carts.service.js";
export const viewsRouter = Router();

viewsRouter.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    console.log(cid);
    const cartFound = await CServives.getCartById(cid);
    console.log(cartFound);
    return res.render("cart", cartFound);
  } catch (e) {
    return res.render("error");
  }
});
viewsRouter.get("/", (req, res) => {
  return res.render("index");
});
