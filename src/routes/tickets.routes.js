import express from "express";
import { ticketsController } from "../controllers/tickets.controller";
export const ticketRouter = express.Router();

ticketRouter.get("/:tid", ticketsController.readById);
