import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const UserModel = model(
  "users",
  new Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100, unique: true },
  })
);
UserModel.plugin(mongoosePaginate);
