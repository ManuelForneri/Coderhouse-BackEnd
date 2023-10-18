import { userModel } from "../DAO/models/users.model.js";
import { logger } from "../utils/logs/logger.js";

class userServices {
  async getAll() {
    const users = await userModel.getAll();

    return users;
  }

  async getAllInfo() {
    const allUsers = await userModel.getAllInfo();
    return allUsers;
  }

  async getOne(username) {
    const user = await userModel.getOne(username);
    return user;
  }
  async getEmail(email) {
    const user = await userModel.getEmail(email);
    return user;
  }
  async getUserById(id) {
    const user = userModel.getUserById(id);
    return user;
  }

  async create({ first_name, last_name, username, email, age, password, cid }) {
    const userCreated = await userModel.create({
      first_name,
      last_name,
      username,
      email,
      age,
      password,
      cid,
    });
    return userCreated;
  }

  async delete(id) {
    const result = await userModel.delete(id);
    return result;
  }
  async update(id, firstName, lastName, email) {
    const userUptaded = await userModel.update(id, firstName, lastName, email);
    return userUptaded;
  }

  async auth(email, password) {
    try {
      const user = await userModel.auth(email, password);

      return user;
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }
  async userUpdateRole(uid) {
    try {
      const result = await userModel.userUpdateRole(uid);
      return result;
    } catch (e) {
      logger.error(
        "No se pudo completar la operacion de actualizar fallo en el services"
      );
    }
  }
  async lastConection(uid) {
    try {
      let result = await userModel.lastConection(uid);
      return result;
    } catch (e) {
      logger.error(
        "No se pudo guardar la ultima conexion, error en el services"
      );
    }
  }
}
export const UServices = new userServices();
