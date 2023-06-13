//@ts-check
import { Schema, model } from "mongoose";

export const ProductModel = model(
  "products",
  new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    stock: { type: String, required: true, max: 100 },
  })
);

//{"id":1,"title":"Producto 1","description":"Este es un producto prueba","price":2000,"thumbnail":"Sin imagen","code":"#1","stock":25}
