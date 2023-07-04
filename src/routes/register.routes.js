import express from "express";
import { UServices } from "../services/users.service.js";
import { authenticate } from "../middlewares/authenticate.js";
export const registerRoutes = express.Router();

registerRoutes.get("/", (req, res) => {
  return res.render("register");
});
registerRoutes.post("/", async (req, res) => {
  let newUser = req.body;
  const resolve = await UServices.create({
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    username: newUser.username,
    email: newUser.email,
    age: newUser.age,
    password: newUser.password,
  });
  if (resolve) {
    res.redirect("/perfil");
  } else {
    res.render("errorRegister");
  }
});
registerRoutes.get("/perfil", authenticate, (req, res) => {
  res.render("profile");
});
