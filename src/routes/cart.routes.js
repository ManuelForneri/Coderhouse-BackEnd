import { Router } from "express";
export const cartRouter = Router();

//import { products } from "../utils.js";
import { CartManager } from "../cartManager.js";
const CartM = new CartManager();
