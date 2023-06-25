//@ts-check
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: String, required: true, max: 100 },
  category: { type: String, require: true, max: 100 },
});

productsSchema.plugin(mongoosePaginate);

export const ProductModel = model("products", productsSchema);

//{"id":1,"title":"Producto 1","description":"Este es un producto prueba","price":2000,"thumbnail":"Sin imagen","code":"#1","stock":25}
