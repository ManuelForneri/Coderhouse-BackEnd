import { Router } from "express";
export const productsRouter = Router();

//import { products } from "../utils.js";

import { ProductManager } from "../DAO/ProductManager.js";
import { PServives } from "../services/products.service.js";
const ProductM = new ProductManager();

productsRouter.get("/", async (req, res) => {
  try {
    const query = req.query;
    if (!query.limit) {
      const products = await PServives.getLimit(query.limit);
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        payload: products,
      });
    } else {
      const products = await PServives.getAll();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        payload: products,
      });
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
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;

    const productCreated = await PServives.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    return res.status(201).json({
      status: "success",
      msg: "user created",
      payload: {
        id: productCreated._id,
        title: productCreated.title,
        description: productCreated.description,
        price: productCreated.price,
        thumbnail: productCreated.thumbnail,
        code: productCreated.code,
        stock: productCreated.stock,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
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
