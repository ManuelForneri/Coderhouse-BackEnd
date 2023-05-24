import express from "express";
export const realTimeProducts = express.Router();
import { ProductManager } from "../ProductManager.js";
const ProductM = new ProductManager();

realTimeProducts.get("/", (req, res) => {
  let title = "Listado de productos en tiempo real";
  let products = ProductM.getProducts();
  return res.status(200).render("realtimeproducts", { title, products });
});
