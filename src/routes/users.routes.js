import express from "express";
import { UServices } from "../services/users.service.js";
export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await UServices.getAll();
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

usersRouter.post("/", async (req, res) => {
  try {
    const { first_name, last_name, username, email, age, password, role } =
      req.body;

    const userCreated = await UServices.create({
      first_name,
      last_name,
      username,
      email,
      age,
      password,
      role,
    });

    return res.status(201).json({
      status: "success",
      msg: "user created",
      payload: {
        first_name: userCreated.first_name,
        last_name: userCreated.last_name,
        username: userCreated.username,
        email: userCreated.email,
        age: userCreated.age,
        password: userCreated.password,
        role: userCreated.role,
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
      const userUptaded = await UServices.update(
        id,
        firstName,
        lastName,
        email
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

usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UServices.delete(id);
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
