import express from "express";
import { UServices } from "../services/users.service.js";
export const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
  return res.render("login");
});
loginRoutes.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  const userFind = await UServices.getOne(username);
  console.log(userFind);
  if (userFind) {
    let userLogin = UServices.auth(username, password);
    if (userLogin) {
      req.session.user = {
        _id: userFind._id,
        age: userFind.age,
        email: userFind.email,
        firstName: userFind.first_name,
        lastName: userFind.last_name,
        role: userFind.role,
      };
      res.redirect("/perfil");
    }
  } else {
    return res.render("errorLogin");
  }
});
