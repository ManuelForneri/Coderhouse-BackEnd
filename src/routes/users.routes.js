import express from "express";
import { UserModel } from "../DAO/models/users.model.js";
import { UServives } from "../services/users.service.js";
export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await UServives.getAll();
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      payload: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

//crear usuario
usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const userCreated = await UServives.create({ firstName, lastName, email });

    return res.status(201).json({
      status: "success",
      msg: "user created",
      payload: {
        id: userCreated._id,
        firstName: userCreated.firstName,
        lastName: userCreated.lastName,
        email: userCreated.email,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

//actualizar usuario
usersRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    try {
      const userUptaded = await UserModel.updateOne(
        { _id: id },
        { firstName, lastName, email }
      );
      if (userUptaded.matchedCount > 0) {
        return res.status(201).json({
          status: "success",
          msg: "user update",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "user not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "db server error while updating user",
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

//eliminar un usuario
usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UServives.delete(id);
    if (result?.deletedCount > 0) {
      return res.status(200).json({
        status: "success",
        msg: "user deleted",
        payload: {},
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "user not found",
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});
