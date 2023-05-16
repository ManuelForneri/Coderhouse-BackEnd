import { Router } from "express";
export const productsRouter = Router();

//import { products } from "../utils.js";

import { ProductManager } from "../productManager.js";
const ProductM = new ProductManager();

productsRouter.get("/", (req, res) => {
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

productsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  let products = ProductM.getProducts();
  const productSerched = products.find((p) => p.id == id);
  if (!!productSerched) {
    return res.status(200).json({
      status: "success",
      msg: "Producto buscado",
      data: productSerched,
    });
  } else {
    return res
      .status(404)
      .json({ status: "error", msg: "El producto no existe", data: {} });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  ProductM.addProduct(newProduct);
  return res
    .status(201)
    .json({ status: "succes", msg: "Producto creado", data: newProduct });
});

productsRouter.put("/:id", (req, res) => {
  const idSearch = req.params.id;
  const updateProduct = req.body;
  console.log(idSearch);
  console.log(updateProduct);
  let upProd = ProductM.updateProduct(idSearch, updateProduct);

  return res.status(200).json({
    status: "succes",
    msg: "Producto modificado correctamente",
    data: upProd,
  });
});

productsRouter.delete("/:id", (req, res) => {
  const idRemove = req.params.id;
  ProductM.removeProduct(idRemove);
  return res.status(200).json({ status: "success", msg: "Productos " });
});
