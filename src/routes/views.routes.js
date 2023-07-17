import { Router } from "express";
export const viewsRouter = Router();

viewsRouter.get("/cart/:cid", (req, res) => {
  const cart = [
    {
      title: "hola",
      price: 1000,
      quantity: 1,
    },
  ];
  return res.render("cart", { cart });
});
viewsRouter.get("/", (req, res) => {
  return res.render("index");
});
