import { AServices } from "../services/admin.service.js";
import { logger } from "../utils/logs/logger.js";

class AdminController {
  adminView = (req, res) => {
    res.render("admin");
  };
  userManager = (req, res) => {
    res.render("user-manager");
  };
  clearListUsers = async (req, res) => {
    try {
      let result = await AServices.clearListUsers();
      console.log(result);
      res.send("usuarios eliminados correctamente");
    } catch (e) {
      logger.error(
        "error en controller de administrador, funcion de userManager"
      );
      res.send("Error, vuelve a intentarlo");
    }
  };
}
export const adminController = new AdminController();
