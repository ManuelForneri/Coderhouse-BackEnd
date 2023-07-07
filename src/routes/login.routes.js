import express from "express";
import passport from "passport";
export const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
  return res.render("login");
});
loginRoutes.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/errorLogin" }),
  async (req, res) => {
    const user = req.body;
    if (!user) {
      return res.render("errorLogin");
    }
    req.session.user = {
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      age: user.age,
      role: user.role,
    };
    res.redirect("/perfil");
  }
);
