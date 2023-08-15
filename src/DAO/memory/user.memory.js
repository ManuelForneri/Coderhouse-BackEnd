class UserMemory {
  constructor() {
    this.users = [];
  }

  async getAll() {
    try {
      return this.users;
    } catch (e) {
      throw e;
    }
  }
  //cambiar a memory

  async getOne(username) {
    const user = this.users.find((user) => user.username === username);
    return user;
  }
  //   async getUserById(id) {
  //     const user = await userMongoose.findById({ _id: id });
  //     return user;
  //   }
  //   async create({ first_name, last_name, username, email, age, password, cid }) {
  //     const userCreated = await userMongoose.create({
  //       first_name,
  //       last_name,
  //       username,
  //       email,
  //       age,
  //       password,
  //       cid,
  //     });
  //     return userCreated;
  //   }
  //   async delete(id) {
  //     const result = await userMongoose.deleteOne({ _id: id });
  //     return result;
  //   }
  //   async update(id, firstName, lastName, email) {
  //     const userUptaded = await userMongoose.updateOne(
  //       { _id: id },
  //       { firstName, lastName, email }
  //     );
  //     return userUptaded;
  //   }

  //   async auth(username, password) {
  //     try {
  //       const user = await userMongoose.findOne({
  //         username: username,
  //       });
  //       if (user && isValidPassword(password, user.password)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } catch (error) {
  //       console.error("Error authenticating user:", error);
  //       throw error;
  //     }
  //   }
}
export const userMemory = new UserMemory();
