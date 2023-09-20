import { randomBytes } from "crypto";
import { RecoverCodeMongoose } from "../DAO/models/mongoose/recover-code.mongoose.js";
import env from "../config/enviroment.config.js";
import { UServices } from "../services/users.service.js";
import { logger } from "../utils/logs/logger.js";
import { transport } from "../utils/nodemailer.js";

class RecoverPassController {
  recoveryPass = async (req, res) => {
    try {
      const { email } = req.body;

      const user = await UServices.getEmail(email.toLowerCase());
      if (user) {
        //generando codigo de recuperacion
        const code = randomBytes(20).toString("hex");
        const expire = Date.now() + 3600000;
        await RecoverCodeMongoose.create({
          email,
          code,
          expire,
        });
        //enviar un mail con el link de recuperacion
        await transport.sendMail({
          from: env.gmail,
          to: email,
          subject: "Restablecer contraseña",
          html: ` 
          <div>
            <h1 style="color: "red"">Restablecer contraseña</h1>
            <p>Si desea restablecer la contraseña haga click</p>
            <a href="http://localhost:8080/recover-pass?code=${code}&email=${email}" >Aqui</a>
          </div>`,
        });
        res.send("Revise su casilla de mail");
        //hacer un render
      } else {
        res.send("ese mail no existe");
        //hacer un render
      }
    } catch (e) {
      logger.error(e);
    }
  };

  checkCode = (req, res) => {
    const { code, email } = req.query;
    //llamar al services para chekear el codigo

    res.send(code + email);
  };
}
export const recoverPassController = new RecoverPassController();
