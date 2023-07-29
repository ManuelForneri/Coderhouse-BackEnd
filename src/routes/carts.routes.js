//@ts-check
import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
export const cartRouter = Router();

cartRouter.get("/", cartsController.getAll); //✅
cartRouter.get("/:id", cartsController.getCartById); //✅
cartRouter.post("/", cartsController.createCart); //✅
cartRouter.post("/:cid/product/:pid", cartsController.addProductInCart); //✅
cartRouter.delete("/:cid/product/:pid", cartsController.deleteProductInCart);
cartRouter.delete("/:cid", cartsController.deleteCart);
