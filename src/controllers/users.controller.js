class UserController {
  async getAll(res, req) {
    try {
      const users = await UServices.getAll();
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
  }

  async create(res, req) {
    try {
      const { first_name, last_name, username, email, age, password } =
        req.body;

      const userCreated = await UServices.create({
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
  }
}
export const userController = new UserController();
