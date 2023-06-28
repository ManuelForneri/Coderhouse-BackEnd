import { UserModel } from "../DAO/models/users.model.js";

class userServives {
  async getAll() {
    const users = await UserModel.find(
      {},
      {
        _id: true,
        firstName: true,
        lastName: true,
        email: true,
      }
    );
    return users;
  }
  async getOne(username) {
    const users = await UserModel.findOne(
      { username: username },
      { password: false, __v: false }
    );
    return users;
  }
  async authenticate(username, password) {
    try {
      const user = await UserModel.findOne({
        username: username,
        password: password,
      });
      if (!user) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }

  async create({ firstName, lastName, email }) {
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return userCreated;
  }

  async delete(id) {
    const result = await UserModel.deleteOne({ _id: id });
    return result;
  }
  async update(id, firstName, lastName, email) {
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  }
}
export const UServives = new userServives();
