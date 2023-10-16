import express from "express";
import { UServices } from "../services/users.service.js";
export const logoutRoutes = express.Router();

logoutRoutes.get("/", async (req, res) => {
  await UServices.lastConection(req.session.user._id);
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }

    return res.redirect("/login");
  });
});
