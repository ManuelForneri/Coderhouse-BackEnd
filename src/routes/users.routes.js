import express from "express";
import { UserModel } from "../models/users.model.js";
export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

//crear usuario
usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const userCreated = await UserModel.create({ firstName, lastName, email });
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

//actualizar usuario
usersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return res.status(201).json({
      status: "success",
      msg: "user uptaded",
      data: userUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

//eliminar un usuario
usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.deleteOne({ _id: id });
    return res.status(200).json({
      status: "success",
      msg: "user deleted",
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
