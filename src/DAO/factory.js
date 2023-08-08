import mongoose from "mongoose";
import env from "../config/enviroment.config.js";
import { productModel } from "./models/products.model.js";
import { userModel } from "./models/users.model.js";
import { cartsModel } from "./models/carts.model.js";


async function importModels() {
	let models;

	switch (env.persistence) {
		case "MONGO":
			
			mongoose.connect(env.mongoUrl);
			models = {
				products: productModel,
				users: userModel,
				carts: cartsModel,
				tickets: ,
			};
			break;

		case "MEMORY":
			console.log("Database: Persistencia en memoria");
			models = {
				products: productsMemory,
				users: usersMemory,
				carts: cartsMemory,
				tickets: ticketsMemory,
			};
			break;

		default:
			throw new Error(`El tipo de persistencia "${env.persistence}" no es válido.`);
	}

	return models;
}

export default importModels;