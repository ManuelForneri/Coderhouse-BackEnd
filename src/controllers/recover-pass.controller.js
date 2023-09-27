import env from "../config/enviroment.config.js";
import { RPServise } from "../services/recover-pass.service.js";
import { UServices } from "../services/users.service.js";
import { transport } from "../utils/nodemailer.js";

class RecoverPassController {
  recoveryPass = async (req, res) => {
    try {
      const { email } = req.body;

      const user = await UServices.getEmail(email.toLowerCase());
      if (user) {
        //generando codigo de recuperacion
        const result = await RPServise.create(email);

        //enviar un mail con el link de recuperacion
        await transport.sendMail({
          from: env.gmail,
          to: email,
          subject: "Restablecer contraseña",
          html: ` 
          <div>
            <h1 style="color: "red"">Restablecer contraseña</h1>
            <p>Si desea restablecer la contraseña haga click</p>
            <a href="http://localhost:8080/recover-pass?code=${result.code}&email=${email}" >Aqui</a>
          </div>`,
        });
        res.send("Revise su casilla de mail");
        //hacer un render
      } else {
        res.send("ese mail no existe");
        //hacer un render
      }
    } catch (error) {
      console.log(error);
      //verificar logger
    }
  };

  checkCode = async (req, res) => {
    try {
      const { code, email } = req.query;

      const result = await RPServise.checkCode({ code, email });
      if (result) {
        res.render("recoverpass", { email: email });
      } else {
        res.send("El codigo expiro o es invalido");
      }
    } catch (error) {
      let data = {
        title: "Error inesperado",
        text: "intentelo otra vez",
      };
      res.render("error", data);
    }
  };
  updatePassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const result = await RPServise.updatePassword({ email, newPassword });
      if (result) {
        res.redirect("/login");
      } else {
        res.send("error algo fallo");
      }
    } catch (e) {
      res.send("error hacer un handle");
    }
  };
}
export const recoverPassController = new RecoverPassController();
