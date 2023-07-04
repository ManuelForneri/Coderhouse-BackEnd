import express from "express";
export const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
  return res.render("login");
});
