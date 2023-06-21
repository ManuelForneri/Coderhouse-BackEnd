import express from "express";

import { PServives } from "../services/products.service.js";

export const home = express.Router();

home.get("/", async (req, res) => {
  const title = "Listado de productos";
  try {
    const query = req.query;
    if (!!query.limit) {
      const products = await PServives.getLimit(query.limit);
      return res.status(200).render("home", title, products);
    } else {
      const products = await PServives.getAll();
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

  /*
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
*/
});
