import express from "express";
import { PServives } from "../services/products.service.js";

export const home = express.Router();

home.get("/", async (req, res) => {
  try {
    const title = "Listado de productos";
    const query = req.query;
    if (!!query.limit) {
      const products = await PServives.getLimit(query.limit);
      return res.status(200).render("home", { title, products });
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
});
