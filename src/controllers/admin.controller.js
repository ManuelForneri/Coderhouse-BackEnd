import { AServices } from "../services/admin.service.js";
import { UServices } from "../services/users.service.js";
import { logger } from "../utils/logs/logger.js";

class AdminController {
  adminView = (req, res) => {
    res.render("admin");
  };
  userManager = async (req, res) => {
    let users = await UServices.getAllInfo();
    let plainUsers = users.map((doc) => doc.toObject());
    res.render("user-manager", { users: plainUsers });
  };
  clearListUsers = async (req, res) => {
    try {
      let result = await AServices.clearListUsers();
      console.log(result);
      res.render("user-succes-delete");
    } catch (e) {
      logger.error(
        "error en controller de administrador, funcion de userManager"
      );
      res.send("Error, vuelve a intentarlo");
    }
  };
}
export const adminController = new AdminController();
