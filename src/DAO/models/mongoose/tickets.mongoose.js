import { Schema, model } from "mongoose";

const ticketsSchema = new Schema({
  code: { type: String, required: true, max: 100 },
  purchase_datetime: { type: String, required: true, max: 100 },
  amount: { type: String, required: true, max: 100 },
  purcharser: { type: String, required: true, max: 100 },
});

export const ticketsMongoose = model("tickets", ticketsSchema);
