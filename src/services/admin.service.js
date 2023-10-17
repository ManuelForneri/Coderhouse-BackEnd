import { userModel } from "../DAO/models/users.model.js";
import { logger } from "../utils/logs/logger.js";

class adminServices {
  async clearListUsers() {
    try {
      let result = await userModel.clearListUsers();
      return result;
    } catch (e) {
      logger.error(
        "No se pudo borrar los usuarios que no se conectaron en 2 hs , error en el services de adminServices"
      );
    }
  }
}
export const AServices = new adminServices();
