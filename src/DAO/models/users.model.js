import { userMongoose } from "./mongoose/users.mongoose.js";

class UserModel {
  async getAll() {
    try {
      const user = await userMongoose.find(
        {},
        {
          __v: false,
        }
      );
      return user;
    } catch (e) {
      throw e;
    }
  }
}
export const userModel = new UserModel();
