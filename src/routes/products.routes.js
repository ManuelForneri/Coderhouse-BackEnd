import express from "express";
import { Router } from "express";
const router = Router();
export const productsRouter = express.Router();

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

productsRouter.post("/", (req, res) => {
  const newProduct = req.body;
  ProductM.addProduct(newProduct);
  return res
    .status(201)
    .json({ status: "succes", msg: "Producto creado", data: newProduct });
});

productsRouter.put("/:id", (req, res) => {
  const idSearch = req.params.id;
  const updateProduct = req.body;
  ProductM.updateProduct(idSearch, updateProduct);

  /*
  let products = ProductM.getProducts();
  const searchedProduct = products.find((product) => product.id == idSearch);
  if (searchedProduct === undefined) {
    console.log("No se encontro ningun producto con esas caracteristicas");
  } else {
    Object.assign(searchedProduct, updateProduct);
  }
  */
  return res.status(200).json({
    status: "succes",
    msg: "Producto modificado correctamente",
  });
});

productsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  products = products.filter((p) => p.id != id);
  return res
    .status(200)
    .json({ status: "success", msg: "Productos ", data: products });
});
