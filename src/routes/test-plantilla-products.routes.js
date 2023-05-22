import { Router } from "express";
export const testPlantillaProducts = Router();

//import { products } from "../utils.js";

import { ProductManager } from "../ProductManager.js";
const ProductM = new ProductManager();

testPlantillaProducts.get("/", (req, res) => {
  let products = ProductM.getProducts();
  const query = req.query;
  console.log(query);
  if (!!query.limit) {
    let limit = parseInt(query.limit);
    let prodLimits = [];
    for (let i = 0; i < limit; i++) {
      prodLimits.push(products[i]);
    }
    res.json(prodLimits);
  } else {
    res.json(products);
  }
});
