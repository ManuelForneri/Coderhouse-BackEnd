import express from "express";

import { PServives } from "../services/products.service.js";

export const home = express.Router();

home.get("/", async (req, res) => {
  const title = "Listado de productos";
  try {
    const queryParams = req.query;
    const limit = req.query.limit;
    const response = await PServives.getAll(queryParams);
    const products = response.payload.products.map((product) => {
      return {
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
      };
    });
    return res.status(200).render("home", { title, products, response, limit });
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
