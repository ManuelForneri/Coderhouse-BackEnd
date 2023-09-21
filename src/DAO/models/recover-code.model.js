import { RecoverCodeMongoose } from "./mongoose/recover-code.mongoose.js";

class RecoverCodeModel {
  async create({ email, code, expire }) {
    const result = await RecoverCodeMongoose.create({
      email,
      code,
      expire,
    });
    return result;
  }
  async checkCode({ code, email }) {
    const result = false;
    const codeCheck = await RecoverCodeMongoose.findOne({ code, email }, {});

    if (checkCode.expire > Date.now()) {
      result = true;
    }

    return result;
  }
}
export const recoverCodeModel = new RecoverCodeModel();
