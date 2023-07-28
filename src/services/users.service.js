//@ts-check

import { userModel } from "../DAO/models/users.model.js";
import { isValidPassword } from "../utils/hashPassword.js";

class userServices {
  async getAll() {
    const users = await userModel.getAll();

    return users;
  }

  async getOne(email) {
    const user = await userModel.getOne(email);
    return user;
  }

  async create({ first_name, last_name, username, email, age, password }) {
    const userCreated = await userModel.create({
      first_name,
      last_name,
      username,
      email,
      age,
      password,
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
}
export const UServices = new userServices();
