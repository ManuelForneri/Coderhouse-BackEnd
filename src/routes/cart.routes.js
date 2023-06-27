import { Router } from "express";
export const cartRouter = Router();

import { CServives } from "../services/carts.service.js";
import { PServives } from "../services/products.service.js";

cartRouter.get("/", async (req, res) => {
  try {
    const query = req.query;
    if (!query.limit) {
      const carts = await CServives.getLimit(query.limit);
      return res.status(200).json({
        status: "success",
        msg: "listado de Carritos",
        payload: carts,
      });
    } else {
      const carts = await CServives.getAll();
      return res.status(200).json({
        status: "success",
        msg: "listado de Carritos",
        payload: carts,
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

cartRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartFound = await CServives.getCartById(id);

    if (cartFound) {
      return res
        .status(201)
        .json({ status: "success", msg: "cart found", payload: cartFound });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "The indicated cart was not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const cartCreated = await CServives.create({});
    return res.status(201).json({
      status: "success",
      msg: "Cart created",
      payload: cartCreated,
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const productById = await PServives.getProductById(pid);

    if (productById) {
      const createdProduct = await CServives.addProductToCart(cid, pid);
      if (createdProduct) {
        return res.status(201).json({
          status: "success",
          msg: "product added to cart",
          payload: createdProduct,
        });
      } else {
        return res.status(400).json({
          status: "error",
          msg: "The product was not added to the cart",
        });
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "No product found to add to cart" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "could not add product to cart",
      error: error.message,
    });
  }
});
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const productById = await PServives.getProductById(pid);

    if (productById) {
      const deletedProduct = await CServives.deleteProduct({ cid, pid });

      if (deletedProduct) {
        return res.status(200).json({
          status: "success",
          msg: "product removed from cart",
          payload: deletedProduct,
        });
      } else {
        return res.status(400).json({
          status: "error",
          msg: "The product was not removed from the cart",
        });
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "No product found to remove from cart" });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Could not remove product from cart",
      error: error.message,
    });
  }
});
cartRouter.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartToEmpty = await CServives.deleteCart({ cid });
    if (cartToEmpty) {
      return res
        .status(200)
        .json({ status: "success", msg: "cart removed", payload: cartToEmpty });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "The indicated cart was not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error" });
  }
});
