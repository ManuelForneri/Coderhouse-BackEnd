//@ts-check
import express from "express";
import { PServives } from "../services/products.service.js";
export const realTimeProducts = express.Router();

realTimeProducts.get("/", async (req, res) => {
  let title = "Listado de productos en tiempo real";
  const products = await PServives.getAll();
  return res.status(200).render("realtimeproducts", { title, products });
});
