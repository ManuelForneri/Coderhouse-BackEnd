import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import fetch from "node-fetch";
import { UserModel } from "../DAO/models/users.model.js";
import { UServices } from "../services/users.service.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { CServives } from "../services/carts.service.js";
const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    "login",
    new LocalStrategy({}, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });
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
          const { first_name, last_name, email, age, role } = req.body;
          let user = await UServices.getOne(username);
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          let userCart = await CServives.create();

          if (!userCart) {
            console.log("Error en crear  un carrito para el usuario");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            username,
            email,
            age,
            role,
            password: createHash(password),
            cid: userCart._id.toString(),
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

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.2d103252830c337b",
        clientSecret: "fcc8a8c56d41da58ee2ecbe8e57a9ad8d07fdc1e",
        callbackURL: "http://localhost:8080/login/githubcallback",
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }
          profile.email = emailDetail.email;

          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            let userCart = await CServives.create();
            if (!userCart) {
              console.log("Error en crear  un carrito para el usuario");
              return done(null, false);
            }
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || "noname",
              lastName: "nolast",
              isAdmin: false,
              password: "nopass",
              cid: userCart._id.toString(),
            };
            let userCreated = await UserModel.create(newUser);
            console.log("User Registration succesful");
            return done(null, userCreated);
          } else {
            console.log("User already exists");
            return done(null, user);
          }
        } catch (e) {
          console.log("Error en auth github");
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
