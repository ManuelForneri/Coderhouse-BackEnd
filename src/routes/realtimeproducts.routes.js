//@ts-check
import express from "express";
import { PServices } from "../services/products.service.js";
export const realTimeProducts = express.Router();

realTimeProducts.get("/", async (req, res) => {
  try {
    let title = "Listado de productos en tiempo real";
    const response = await PServices.getProductRealTime();

    const products = response.map((product) => {
      return {
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
      };
    });
    return res.status(200).render("realtimeproducts", { title, products });
  } catch (error) {
    return res.render("error");
  }
});
