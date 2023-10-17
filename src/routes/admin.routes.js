import express from "express";
import { adminController } from "../controllers/admin.controller.js";
export const adminRouter = express.Router();

adminRouter.get("/", adminController.adminView);
adminRouter.get("/user-manager", adminController.userManager);
adminRouter.get("/clear-list", adminController.clearListUsers);
