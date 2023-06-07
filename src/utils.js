import { connect } from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const uploader = multer({ storage });

//conectando a mongo

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://manuelforneri:120110keko@elabuelotessoredb.pj5hwdc.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
