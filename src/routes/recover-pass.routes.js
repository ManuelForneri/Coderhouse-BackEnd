import express from "express";
import { recoverPassController } from "../controllers/recover-pass.controller.js";
export const recoverPassRoutes = express.Router();

//recovery-password
recoverPassRoutes.post("/", recoverPassController.recoveryPass);
loginRoutes.get("/", recoverPassController.checkCode);
