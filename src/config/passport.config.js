import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import fetch from "node-fetch";
import { UServices } from "../services/users.service.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { CServices } from "../services/carts.service.js";
import { userController } from "../controllers/users.controller.js";
import { userMongoose } from "../DAO/models/mongoose/users.mongoose.js";
import { cartsController } from "../controllers/carts.controller.js";
const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    "login",
    new LocalStrategy({}, async (username, password, done) => {
      try {
        const user = await UServices.getOne(username);
        if (!user) {
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
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
            return done(null, false);
          }
          let userCart = await cartsController.createCart();

          if (!userCart) {
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
          let userCreated = await userController.create(newUser);

          return done(null, userCreated);
        } catch (e) {
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

          let user = await userMongoose.findOne({ email: profile.email });
          if (!user) {
            let userCart = await CServices.createCart();
            if (!userCart) {
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
            let userCreated = await userController.create(newUser);

            return done(null, userCreated);
          } else {
            return done(null, user);
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userController.getUserById(id);
    done(null, user);
  });
}
