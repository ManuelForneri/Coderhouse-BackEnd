import { Router } from "express";
export const productsRouter = Router();

import { PServices } from "../services/products.service.js";
import { productsController } from "../controllers/products.controller.js";

productsRouter.get("/", productsController.getAll);

productsRouter.get("/:id", productsController.getProductById);

productsRouter.post("/", productsController.createProduct);

productsRouter.put("/:id", productsController.updateProduct);

productsRouter.delete("/:id", productsController.deleteProduct);
