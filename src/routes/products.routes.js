import { Router } from "express";
export const productsRouter = Router();

import { PServives } from "../services/products.service.js";

productsRouter.get("/", async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await PServives.getAll(queryParams);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.render("error");
  }

  // try {
  //   const query = req.query;
  //   if (!query.limit) {
  //     const products = await PServives.getLimit(query.limit);
  //     return res.status(200).json({
  //       status: "success",
  //       msg: "listado de Productos",
  //       payload: products,
  //     });
  //   } else {
  //     const products = await PServives.getAll();
  //     return res.status(200).json({
  //       status: "success",
  //       msg: "listado de Productos",
  //       payload: products,
  //     });
  //   }
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({
  //     status: "error",
  //     msg: "something went wrong :(",
  //     payload: {},
  //   });
  // }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await PServives.getProductById(id);

    if (productFound) {
      return res.status(201).json({
        status: "success",
        msg: "Product found",
        payload: productFound,
      });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "The indicated product was not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
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
      msg: "product created",
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

productsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
      const productUptaded = await PServives.update(
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      );
      if (productUptaded.matchedCount > 0) {
        return res.status(201).json({
          status: "success",
          msg: "product update",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "product not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "db server error while updating product",
        payload: {},
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

productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PServives.delete(id);
    if (result?.deletedCount > 0) {
      return res.status(200).json({
        status: "success",
        msg: "product deleted",
        payload: {},
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "product not found",
        payload: {},
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
