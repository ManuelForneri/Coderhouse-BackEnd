import { recoverCodeModel } from "../DAO/models/recover-code.model.js";
import { randomBytes } from "crypto";

class recoverPassServices {
  async create(email) {
    //crear codigo y guardarlo en la base de datos
    const code = randomBytes(20).toString("hex");
    const expire = Date.now() + 3600000;

    const result = await recoverCodeModel.create({ email, code, expire });
    return result;
  }
  async checkCode({ code, email }) {
    try {
      //checkear codigo que llego por parametros desde el mail y ver que no expiro
      const result = await recoverCodeModel.checkCode({ code, email });

      return result;
    } catch (e) {
      console.log(e);
    }
  }
  async updatePassword() {}
}
export const RPServise = new recoverPassServices();
