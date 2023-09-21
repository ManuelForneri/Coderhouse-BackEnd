import express from "express";
import { recoverPassController } from "../controllers/recover-pass.controller.js";
export const recoverPassRoutes = express.Router();

//recovery-password
recoverPassRoutes.post("/", recoverPassController.recoveryPass);
recoverPassRoutes.get("/", recoverPassController.checkCode);
recoverPassRoutes.post("/new-password", recoverPassController.updatePassword);
