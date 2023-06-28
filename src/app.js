import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartRouter } from "./routes/cart.routes.js";
import { home } from "./routes/home.routes.js";
import { realTimeChat } from "./routes/realtimechat.routes.js";
import { realTimeProducts } from "./routes/realtimeproducts.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { usersHtmlRouter } from "./routes/users.html.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocketServer } from "./utils/socketServer.js";
//import { cookiesRouter } from "./routes/cookies.routes.js";
//import { sessionsRouter } from "./routes/sessions.routes.js";
//import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const port = 8080;

connectMongo();
//app.use(cookieParser());
app.use(
  session({ secret: "un-re-secreto", resave: true, saveUninitialized: true })
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

app.use("/api/products", /*authenticate,*/ productsRouter);
app.use("/api/carts", /*authenticate,*/ cartRouter);
app.use("/api/users", /*authenticate,*/ usersRouter);
app.use("/html/users", usersHtmlRouter);
app.use("/realtimeproducts", /*authenticate,*/ realTimeProducts);
app.use("/chat", realTimeChat);
//app.use("/cookie", cookiesRouter);
//app.use("/api/sessions/", sessionsRouter);
//app.use("/", sessionsRouter);

// function authenticate(req, res, next) {
//   if (!req.session.user) {
//     return res.render("errorLogin", { msg: "Error authenticate" });
//   }
//   next();
// }

app.get("/session", (req, res) => {
  if (req.session.cont) {
    req.session.cont++;
    res.send("nos visitaste " + req.session.cont);
  } else {
    req.session.cont = 1;
    req.session.name = "manuel";
    req.session.lastSearch = "hyperx-cloud-fligth";

    res.send("nos visitaste " + 1);
  }
});
app.use("/", home);
// app.get("*", (req, res) => {
//   return res.render("errorLogin", { msg: "Error link" });
// });

app.get("*", (req, res) => {
  return res.status(404).send("not found");
});
