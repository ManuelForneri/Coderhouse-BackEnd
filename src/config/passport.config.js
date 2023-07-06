import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { UserModel } from "../DAO/models/users.model.js";
const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    "login",
    new LocalStrategy({}, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
          console.log("User Not Found with username " + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          console.log("Invalid Password");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;
          let user = await UserModel.findOne({ username: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            username,
            email,
            age,
            password: createHash(password),
          };
          let userCreated = await UserModel.create(newUser);
          console.log(userCreated);
          console.log("User Registration succesful");
          return done(null, userCreated);
        } catch (e) {
          console.log("Error in register");
          console.log(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
