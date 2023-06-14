//@ts-check
import { Schema, model } from "mongoose";

const prodCartModel = new Schema(
  {
    pid: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

export const cartsModel = model(
  "carts",
  new Schema({
    products: { type: [prodCartModel], required: true },
  })
);
