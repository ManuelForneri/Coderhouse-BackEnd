import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartRouter } from "./routes/cart.routes.js";
import { home } from "./routes/home.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { realTimeChat } from "./routes/realtimechat.routes.js";
import { realTimeProducts } from "./routes/realtimeproducts.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { usersHtmlRouter } from "./routes/users.html.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocketServer } from "./utils/socketServer.js";
import { cookiesRouter } from "./routes/cookies.routes.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";

const app = express();
const port = 8080;

connectMongo();
app.use(cookieParser());
app.use(
  session({
    secret: "un-re-secreto",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://manuelforneri:120110keko@elabuelotessoredb.pj5hwdc.mongodb.net/?retryWrites=true&w=majority",
      dbName: "ecommerce",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//config del motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
connectSocketServer(httpServer);


app.use("/products", authenticate, home);
app.use("/api/products", authenticate, productsRouter);
app.use("/api/carts", authenticate, cartRouter);
app.use("/api/users", authenticate, usersRouter);
app.use("/html/users", authenticate, usersHtmlRouter);
app.use("/realtimeproducts", authenticate, realTimeProducts);
app.use("/chat", realTimeChat);
app.use("/cookie", cookiesRouter);
app.use("/api/sessions/", sessionsRouter);

function authenticate(req, res, next) {
  if (!req.session.user) {
    return res.render("errorLogin", { msg: "Error authenticate" });
  }
  next();
}
app.use("/", (req, res) => {
  return res.render("index");
});

app.get("*", (req, res) => {
  return res.status(404).send("not found");
});
