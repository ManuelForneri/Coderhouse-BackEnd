import { Router } from "express";
export const productsRouter = Router();

import { PServices } from "../services/products.service.js";
import { productsController } from "../controllers/products.controller.js";

productsRouter.get("/", productsController.getAll);

productsRouter.get("/:id", productsController.getProductById);

productsRouter.post("/", productsController.createProduct);

productsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
      const productUptaded = await PServices.update(
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      );
      if (productUptaded.matchedCount > 0) {
        return res.status(201).json({
          status: "success",
          msg: "product update",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "product not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "db server error while updating product",
        payload: {},
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
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PServices.delete(id);
    if (result?.deletedCount > 0) {
      return res.status(200).json({
        status: "success",
        msg: "product deleted",
        payload: {},
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "product not found",
        payload: {},
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
});
