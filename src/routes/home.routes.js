import express from "express";
import { ProductManager } from "../DAO/ProductManager.js";
const ProductM = new ProductManager();
//import { PServives } from "../services/products.service.js";

export const home = express.Router();

home.get("/", async (req, res) => {
  const title = "Listado de productos";
  let products = ProductM.getProducts();
  const query = req.query;

  if (!!query.limit) {
    let limit = parseInt(query.limit);
    let prodLimits = [];
    for (let i = 0; i < limit; i++) {
      prodLimits.push(products[i]);
      return res.status(200).render("home", { title, prodLimits });
    }
  } else {
    return res.status(200).render("home", { title, products });
  }

  /*quise implementar la base de datos aca pero no funciono
  try {
    const query = req.query;
    if (!!query.limit) {
      const products = await PServives.getLimit(query.limit);
      return res.status(200).render("home", title, products);
    } else {
      const products = await PServives.getAll();
      console.log(products);
      return res.status(200).render("home", { title, products });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
  */
});
