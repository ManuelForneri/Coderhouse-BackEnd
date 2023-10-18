//@ts-check
import express from "express";
import { userController } from "../controllers/users.controller.js";
import { addUsers } from "../utils/addUsers.js";
export const usersRouter = express.Router();

usersRouter.get("/", userController.getAll);

usersRouter.post("/", userController.create);

usersRouter.put("/:id", userController.update);

usersRouter.delete("/:id", userController.delete);

usersRouter.get("/premium/:uid", userController.userUpdateRole);

usersRouter.get("/add-users", async (req, res) => {
  try {
    addUsers();
    res.send("usuarios agregados correctamente");
  } catch (error) {
    res.send("error no se pudo agregar usuarios");
  }
});
