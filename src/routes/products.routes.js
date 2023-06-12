import { Router } from "express";
export const productsRouter = Router();

//import { products } from "../utils.js";

import { ProductManager } from "../DAO/ProductManager.js";
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
      payload: productSerched,
    });
  } else {
    return res
      .status(404)
      .json({ status: "error", msg: "El producto no existe", payload: {} });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  ProductM.addProduct(newProduct);
  return res
    .status(201)
    .json({ status: "succes", msg: "Producto creado", payload: newProduct });
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
    payload: upProd,
  });
});

productsRouter.delete("/:id", (req, res) => {
  const idRemove = req.params.id;
  let msj = ProductM.removeProduct(idRemove);
  if (!msj) {
    return res.status(400).json({
      status: "error",
      msg: "no se encontro ningun producto con ese id",
    });
  } else {
    return res.status(200).json({
      status: "success",
      msg: "Se elimino correctamente el procuto con  el id : " + idRemove,
    });
  }
});
