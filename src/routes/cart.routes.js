import { Router } from "express";
export const cartRouter = Router();

//import { products } from "../utils.js";

import { CartManager } from "../DAO/cartManager.js";
const CartM = new CartManager();

cartRouter.get("/", (req, res) => {
  let carts = CartM.getCarts();
  const query = req.query;
  console.log(query);
  if (!!query.limit) {
    let limit = parseInt(query.limit);
    let cartsLimits = [];
    for (let i = 0; i < limit; i++) {
      cartsLimits.push(carts[i]);
    }
    res.json(cartsLimits);
  } else {
    res.json(carts);
  }
});

cartRouter.get("/:id", (req, res) => {
  const idSearch = req.params.id;
  let cartSerched = CartM.getCartById(idSearch);
  if (!!cartSerched) {
    return res.status(200).json({
      status: "success",
      msg: "Carrito buscado",
      payload: cartSerched,
    });
  } else {
    return res
      .status(404)
      .json({ status: "error", msg: "El carrito no existe", payload: {} });
  }
});

cartRouter.post("/", async (req, res) => {
  let newCart = CartM.createCart();
  return res
    .status(201)
    .json({ status: "succes", msg: "Cart creado", payload: newCart });
});

cartRouter.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;

  const updateCart = CartM.addProductCart(cid, pid);
  if (!updateCart) {
    return res
      .status(404)
      .json({ status: "error", msg: "El carrito no existe", payload: {} });
  } else {
    return res.status(200).json({
      status: "succes",
      msg: "Producto añadido correctamente",
      payload: updateCart,
    });
  }
});

cartRouter.delete("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  let deletedProductCart = CartM.removeProductCart(cid, pid);
  if (!deletedProductCart) {
    return res.status(400).json({
      status: "error",
      msg: "no se encontro ningun producto con ese id",
    });
  } else {
    return res.status(200).json({
      status: "success",
      msg: "Se elimino correctamente el procuto con  el id : " + cid,
      payload: deletedProductCart,
    });
  }
});
