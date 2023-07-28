//@ts-check
import express from "express";
import { userController } from "../controllers/users.controller.js";
export const usersRouter = express.Router();

usersRouter.get("/", userController.getAll);

usersRouter.post("/");
/*

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
*/
