import env from "../config/enviroment.config.js";
import { UServices } from "../services/users.service.js";
import { logger } from "../utils/logs/logger.js";
import { randomBytes } from "crypto";
import { transport } from "../utils/nodemailer.js";

class UserController {
  getAll = (req, res) => {
    try {
      const users = UServices.getAll();
      return res.status(200).json({
        status: "success",
        msg: "listado de usuarios",
        payload: users,
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  //passport login
  getOne = (req, res) => {
    const user = UServices.getOne(username);
    return user;
  };

  async getUserById(id) {
    const user = await UServices.getUserById(id);
    return user;
  }

  create = (newUser) => {
    try {
      const { first_name, last_name, username, email, age, password, cid } =
        newUser;

      const userCreated = UServices.create({
        first_name,
        last_name,
        username,
        email,
        age,
        password,
        cid,
      });

      return userCreated;
    } catch (e) {
      throw new e();
    }
  };

  update = (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;
      try {
        const userUptaded = UServices.update(id, firstName, lastName, email);
        if (userUptaded.matchedCount > 0) {
          return res.status(201).json({
            status: "success",
            msg: "user update",
            payload: {},
          });
        } else {
          return res.status(404).json({
            status: "error",
            msg: "user not found",
            payload: {},
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: "error",
          msg: "db server error while updating user",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  delete = (req, res) => {
    try {
      const { id } = req.params;
      const result = UServices.delete(id);
      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "user deleted",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "user not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  recoveryPass = async (req, res) => {
    try {
      const { email } = req.body;

      const user = await UServices.getEmail(email.toLowerCase());
      if (user) {
        //generando codigo de recuperacion
        const code = randomBytes(20).toString("hex");
        //enviar un mail con el link de recuperacion
        const result = await transport.sendMail({
          from: env.gmail,
          to: email,
          subject: "Restablecer contraseña",
          html: ` 
          <div>
            <h1 style="color: "red"">Restablecer contraseña</h1>
            <p>Si desea restablecer la contraseña haga click</p>
            <a href="http://localhost:8080/login/recover-pass?code=${code}&email=${email}" >Aqui</a>
          </div>`,
        });
        res.send("Revise su casilla de mail");
      } else {
        res.send("ese mail no existe");
      }
    } catch (e) {
      logger.error(e);
    }
  };
  checkCode = (req, res) => {
    const { code, email } = req.query;
    res.send(code + email);
  };
}
export const userController = new UserController();

/*
try {
  const result = await transport.sendMail({
    from: env.gmail,
    to: " manuelforneri5@gmail.com ",
    subject: "Esto es una prueba de un mail automatico",
    html: ` 
    <div>
      <h1>Hola como andan</h1>
      <p>MENTIRA COLGALAAAAA</p>
      <img src="https://i.postimg.cc/c40QLKdh/meme2.webp"/>
      <img src="https://i.postimg.cc/jdG1LQkN/meme1.webp" />
    </div>`,
  });
  logger.info("Email enviado correctamente");
  res.send("Email send successfully");
} catch (e) {
  logger.error("No se pudo enviar el email");
  return res.send("Error al Enviar el Email");
}
*/
