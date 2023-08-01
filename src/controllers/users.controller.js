import { UServices } from "../services/users.service.js";

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
      console.log(e);
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

  create = (req, res) => {
    try {
      const { first_name, last_name, username, email, age, password } =
        req.body;

      const userCreated = UServices.create({
        first_name,
        last_name,
        username,
        email,
        age,
        password,
      });

      return res.status(201).json({
        status: "success",
        msg: "user created",
        payload: {
          first_name: userCreated.first_name,
          last_name: userCreated.last_name,
          username: userCreated.username,
          email: userCreated.email,
          age: userCreated.age,
          password: userCreated.password,
          role: userCreated.role,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
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
      console.log(e);
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
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
}
export const userController = new UserController();
