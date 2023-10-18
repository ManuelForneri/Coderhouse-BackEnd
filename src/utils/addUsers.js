import { faker } from "@faker-js/faker";
import { userMongoose } from "../DAO/models/mongoose/users.mongoose.js";
export async function addUsers() {
  const users = [];

  for (let i = 0; i < 20; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 123,
    });
  }
  try {
    await userMongoose.insertMany(users);
    console.log("inserted", users.length, "users");
  } catch (error) {
    console.log(error);
  }
}
