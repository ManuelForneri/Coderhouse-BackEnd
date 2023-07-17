//@ts-check
import { Schema, model } from "mongoose";

const prodCartSchema = new Schema(
  {
    pid: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);
const cartsSchema = new Schema({
  products: { type: [prodCartSchema], ref: "products", required: true },
});

export const cartsModel = model("carts", cartsSchema);
