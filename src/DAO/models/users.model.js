import { userMongoose } from "./mongoose/users.mongoose.js";
import { isValidPassword } from "../../utils/hashPassword.js";
import { logger } from "../../utils/logs/logger.js";

class UserModel {
  async getAll() {
    try {
      const user = await userMongoose.find(
        {},
        {
          __v: false,
          _id: false,
          cid: false,
          last_connection: false,
          password: false,
          username: false,
        }
      );
      return user;
    } catch (e) {
      throw e;
    }
  }
  async getAllInfo() {
    try {
      const allUsers = await userMongoose.find({}, { __v: false });
      return allUsers;
    } catch (e) {
      logger.error("No se pueden obtener todos los usuarios, error en model");
    }
  }
  async getOne(username) {
    const user = await userMongoose.findOne({ username: username }, {});
    return user;
  }
  async getEmail(email) {
    const user = await userMongoose.findOne({ email: email }, {});
    return user;
  }
  async getUserById(id) {
    const user = await userMongoose.findById({ _id: id });
    return user;
  }
  async create({ first_name, last_name, username, email, age, password, cid }) {
    const userCreated = await userMongoose.create({
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
    const result = await userMongoose.deleteOne({ _id: id });
    return result;
  }
  async update(id, firstName, lastName, email) {
    const userUptaded = await userMongoose.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  }

  async auth(username, password) {
    try {
      const user = await userMongoose.findOne({
        username: username,
      });
      if (user && isValidPassword(password, user.password)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }
  async userUpdateRole(uid) {
    try {
      let result = false;
      let user = await userMongoose.findById({ _id: uid }, {});
      if (user.role === "user") {
        let userUpdate = await userMongoose.findByIdAndUpdate(
          { _id: uid },
          { role: "premium" }
        );
        if (userUpdate) {
          result = true;
        }
      } else if (user.role === "premium") {
        let userUpdate = await userMongoose.findByIdAndUpdate(
          { _id: uid },
          { role: "user" }
        );
        if (userUpdate) {
          result = true;
        }
      }

      return result;
    } catch (e) {
      logger.error(
        "No se pudo completar la operacion de actualizar a premium fallo en el model"
      );
    }
  }
  async lastConection(uid) {
    let result = await userMongoose.updateOne(
      { _id: uid },
      { last_connection: Date.now() }
    );
    return result;
  }
  async clearListUsers() {
    const ahora = new Date();
    const dosDiasAtras = new Date(ahora - 2 * 24 * 60 * 60 * 1000);

    const result = await userMongoose.deleteMany({
      last_connection: { $lt: dosDiasAtras },
      role: { $ne: "admin" },
    });
    return result;
  }
}
export const userModel = new UserModel();
