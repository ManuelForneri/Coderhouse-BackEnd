//import mongoose from "mongoose";
import env from "../config/enviroment.config.js";
//mongo

import { cartsModel } from "./models/carts.model.js";
import { productModel } from "./models/products.model.js";
import { userModel } from "./models/users.model.js";
import { ticketsModel } from "./models/tickets.model.js";
//memory
import { cartsMemory } from "./memory/cart.memory.js";
import { productsMemory } from "./memory/products.memory.js";
import { userMemory } from "./memory/user.memory.js";

//logger
import { logger } from "../utils/logs/logger.js";
import { loggerDev } from "../utils/logs/logger-dev.js";

export async function importModels() {
  let models;

  switch (env.persistence) {
    case "MONGO":
      models = {
        products: productModel,
        users: userModel,
        carts: cartsModel,
        tickets: ticketsModel,
      };
      break;

    case "MEMORY":
      models = {
        products: productsMemory,
        users: userMemory,
        carts: cartsMemory,
        //tickets: ticketsMemory,
      };
      break;

    default:
      throw new Error(
        `El tipo de persistencia "${env.persistence}" no es válido.`
      );
  }

  return models;
}

export async function importLogger() {
  switch (env.loggerLevel) {
    case "info":
      logger;
      break;

    case "debug":
      loggerDev;
      break;

    default:
      throw new Error(`El tipo de logger no es válido.`);
  }
}
