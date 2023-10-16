import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import compression from "express-compression";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { __dirname } from "./config.js";
import env from "./config/enviroment.config.js";
import { iniPassport } from "./config/passport.config.js";
import {
  authenticate,
  checkAdmin,
  checkingRolePermissions,
} from "./middlewares/authenticate.js";
import errorHandle from "./middlewares/error.js";
import { cartRouter } from "./routes/carts.routes.js";
import { cookiesRouter } from "./routes/cookies.routes.js";
import { home } from "./routes/home.routes.js";
import { loginRoutes } from "./routes/login.routes.js";
import { logoutRoutes } from "./routes/logout.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { profileRoutes } from "./routes/profile.routes.js";
import { realTimeChat } from "./routes/realtimechat.routes.js";
import { realTimeProducts } from "./routes/realtimeproducts.routes.js";
import { registerRoutes } from "./routes/register.routes.js";
import { ticketRouter } from "./routes/tickets.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocketServer } from "./utils/socketServer.js";

import { recoverPassRoutes } from "./routes/recover-pass.routes.js";

const app = express();
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
const port = env.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
connectSocketServer(httpServer);

connectMongo();
app.use(cookieParser());

app.use(
  session({
    secret: "un-re-secreto",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: env.mongoUrl,
      dbName: "ecommerce",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15 * 60,
    }),
    cookie: {
      maxAge: 15 * 60 * 1000,
    },
  })
);
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

//Documentacion
const specs = swaggerJSDoc({
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion my-ecommerce",
      description: "Este proyecto es un ecommerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
});
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/products", authenticate, home);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);
app.use("/realtimeproducts", checkingRolePermissions, realTimeProducts);
app.use("/chat", authenticate, realTimeChat);
app.use("/cookie", cookiesRouter);
app.use("/ticket", ticketRouter);

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/recover-pass", recoverPassRoutes);
app.use("/perfil", authenticate, profileRoutes);
app.use("/logout", authenticate, logoutRoutes);
app.use("/", viewsRouter);
app.use("/admin", checkAdmin, adminRouter);

app.get("*", (req, res) => {
  return res.status(404).send("not found");
});
app.use(errorHandle);
