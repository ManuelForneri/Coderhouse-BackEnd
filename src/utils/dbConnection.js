import { connect } from "mongoose";

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://manuelforneri:120110keko@elabuelotessoredb.pj5hwdc.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "ecommerce",
      }
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
