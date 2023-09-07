//@ts-check
import express from "express";
import { productsController } from "../controllers/products.controller.js";

export const home = express.Router();

home.get("/", productsController.getAllRender);

/*
home.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await PServices.getProductById(id);
    if (productFound) {
      return res.status(200).render("home", { productFound });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "The indicated product was not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  }
});
 */
