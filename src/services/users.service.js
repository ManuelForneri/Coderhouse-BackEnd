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

  async create({ firstName, lastName, email }) {
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return userCreated;
  }

  async delete(id) {
    const result = await UserModel.deleteOne({ _id: id });
    return result;
  }
}
export const UServives = new userServives();
