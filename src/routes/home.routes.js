import express from "express";
export const home = express.Router();
import { ProductManager } from "../ProductManager.js";
const ProductM = new ProductManager();

home.get("/", (req, res) => {
  let products = ProductM.getProducts();
  const title = "Listado de productos";
  const query = req.query;

  if (!!query.limit) {
    let limit = parseInt(query.limit);
    let prodLimits = [];
    for (let i = 0; i < limit; i++) {
      prodLimits.push(products[i]);
    }
    return res.status(200).render("home", { title, prodLimits });
  } else {
    return res.status(200).render("home", { title, products });
  }
});
