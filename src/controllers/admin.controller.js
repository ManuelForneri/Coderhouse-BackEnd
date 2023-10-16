import { AServices } from "../services/admin.service.js";
import logger from "../utils/logs/logger.js";

class AdminController {
  adminView = (req, res) => {
    res.send("hola");
  };
  userManager = (req, res) => {
    try {
      AServices.userManager();
    } catch (e) {
      logger.error(
        "error en controller de administrador, funcion de userManager"
      );
    }
  };
}
export const adminController = new AdminController();
