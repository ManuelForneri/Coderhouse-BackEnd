//@ts-check
import { Schema, model } from "mongoose";

export const MessageModel = model(
  "messages",
  new Schema({
    user: { type: String, required: true, max: 100 },
    message: { type: String, required: true, max: 100 },
  })
);
