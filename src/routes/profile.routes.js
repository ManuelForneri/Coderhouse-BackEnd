import express from "express";
export const profileRoutes = express.Router();

profileRoutes.get("/", (req, res) => {
  let { age, email, firstName, lastName, role } = req.session.user;

  res.render("profile", { age, email, firstName, lastName, role });
});
